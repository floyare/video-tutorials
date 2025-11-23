export function levenshtein(a: string, b: string): number {
    const A = a ?? "";
    const B = b ?? "";
    const m = A.length, n = B.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp: number[] = Array(n + 1).fill(0).map((_, j) => j);
    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        for (let j = 1; j <= n; j++) {
            const temp = dp[j];
            const cost = A[i - 1] === B[j - 1] ? 0 : 1;
            dp[j] = Math.min(dp[j]! + 1, dp[j - 1]! + 1, prev! + cost);
            prev = temp;
        }
    }

    return dp[n]!;
}