"use client"

import { useState } from "react";
import { Button } from "../ui/button";

const BadExampleManualState = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const baseClasses = "p-5 text-white transition-all duration-200 ease-in-out rounded-md text-center";

    const stateClasses = `
        ${isDisabled ? 'bg-gray-400 cursor-not-allowed opacity-70' : ''}
        ${!isDisabled && isPressed ? 'bg-red-700 scale-98' : ''}        
        ${!isDisabled && isHovered && !isPressed ? 'bg-red-500' : ''}  
        ${!isDisabled && !isHovered && !isPressed ? 'bg-red-400' : ''} 
        ${isFocused ? 'ring-4 ring-offset-2 ring-red-500' : ''}      
        ${!isDisabled ? 'cursor-pointer' : ''}                       
    `;

    const handleMouseEnter = () => !isDisabled && setIsHovered(true);
    const handleMouseLeave = () => {
        if (!isDisabled) {
            setIsHovered(false);
            setIsPressed(false);
        }
    };
    const handleMouseDown = () => !isDisabled && setIsPressed(true);
    const handleMouseUp = () => !isDisabled && setIsPressed(false);
    const handleFocus = () => !isDisabled && setIsFocused(true);
    const handleBlur = () => !isDisabled && setIsFocused(false);

    return (
        <div className="flex flex-col items-center gap-4 p-6 border border-dashed border-red-500 rounded-lg bg-red-50">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Bad Component Example (Manual JS State)</h3>
            <p className="text-sm text-red-600 text-center mb-4">Uses React state and event handlers for hover, focus, active effects – less optimal than pure CSS/Tailwind modifiers.</p>

            <div
                className={`${baseClasses} ${stateClasses}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={isDisabled ? -1 : 0}
                role="button"
                aria-pressed={isPressed}
                aria-disabled={isDisabled}
            >
                {!isDisabled ? 'Interact with Me (JS Handlers)' : 'I am Disabled (JS State)'}
            </div>

            <Button
                onClick={() => setIsDisabled(prev => !prev)}
                variant={isDisabled ? "destructive" : "secondary"}
                size="sm"
                className="mt-2"
            >
                {isDisabled ? 'Enable Interaction' : 'Disable Interaction'}
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                Notice how much JS (`useState`, event handlers, conditional classes) is needed <br />
                just to replicate `:hover`, `:active`, `:focus`, and `:disabled` states.
            </p>
        </div>
    );
}

export default BadExampleManualState;