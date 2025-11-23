import { prisma } from '@/lib/prisma';
import Fuse from 'fuse.js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') ?? '';

    if (!query) {
        const popular = await prisma.frameworks.findMany({ take: 5 });
        return NextResponse.json(popular);
    }

    const dbResults = await prisma.frameworks.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        take: 10
    });

    if (dbResults.length > 0) {
        return NextResponse.json(dbResults);
    }

    const dataset = await prisma.frameworks.findMany({
        select: { id: true, name: true },
        orderBy: { created_at: 'desc' },
        take: 1000
    });

    const fuse = new Fuse(dataset, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.4,
    });

    const fuzzyResults = fuse.search(query);

    const finalResults = fuzzyResults.map(result => ({
        ...result.item,
        relevance: result.score
    }));

    return NextResponse.json(finalResults.slice(0, 10));
}