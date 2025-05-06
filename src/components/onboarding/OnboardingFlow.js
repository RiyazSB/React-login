import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import onboardingData from './onboardingData.json';
import './OnboardingFlow.css';
import {FcPlus} from "react-icons/fc";
import {FcOk} from "react-icons/fc";

function OnboardingFlow() {
    const [currentStage, setCurrentStage] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [expanded, setExpanded] = useState(false);
    const VISIBLE_OPTIONS = 9; // Number of initially visible options
    const navigate = useNavigate();

    const currentStageData = onboardingData.stages[currentStage];
    const isLastStage = currentStage === onboardingData.stages.length - 1;
    const selectedRole = selectedOptions[0]; // Get role from first stage


    // Toggle visibility function
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // Get dynamic options based on role selection
    const getDynamicOptions = () => {
        if (currentStageData.type.includes('dynamic') && selectedRole) {
            return expanded ? currentStageData.options[selectedRole] || [] : (currentStageData.options[selectedRole] || []).slice(0, VISIBLE_OPTIONS);
        }
        return currentStageData.options || [];
    };

    const filteredOptions = currentStageData.type === 'dynamic-multi-select'
        ? getDynamicOptions().filter(option =>
            option?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        : getDynamicOptions();

    const handleOptionSelect = (optionValue) => {
        if (currentStageData.type === 'dynamic-multi-select') {
            const currentSelections = selectedOptions[currentStage] || [];
            const newSelections = currentSelections.includes(optionValue)
                ? currentSelections.filter(item => item !== optionValue)
                : [...currentSelections, optionValue];

            setSelectedOptions({
                ...selectedOptions,
                [currentStage]: newSelections
            });
        } else {
            setSelectedOptions({
                ...selectedOptions,
                [currentStage]: optionValue
            });
        }
    };

    const validateCurrentStage = () => {
        if (currentStageData.type === 'dynamic-multi-select') {
            return (selectedOptions[currentStage] || []).length >= currentStageData.minSelections;
        }
        return selectedOptions[currentStage] !== undefined;
    };

    const handleContinue = () => {
        if (validateCurrentStage()) {
            if (isLastStage) {
                completeOnboarding();
            } else {
                setCurrentStage(currentStage + 1);
                setSearchTerm(''); // Reset search when moving to next stage
            }
        }
    };

    const completeOnboarding = () => {
        const onboardingData = {
            role: selectedOptions[0],
            goal: selectedOptions[1],
            interests: selectedOptions[2],
            background: selectedOptions[3]
        };

        console.log('Onboarding complete:', onboardingData);
        localStorage.setItem('onboardingComplete', 'true');
        localStorage.setItem('userProfile', JSON.stringify(onboardingData));
        navigate('/dashboard');
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <h1>{currentStageData.title}</h1>
                <p className="subtitle">{currentStageData.subtitle}</p>

                {currentStageData.type === 'dynamic-multi-select' && (
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for interests"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                <div className={`options-container ${currentStageData.type}`}>
                    {filteredOptions.map((option, index) => {
                        const optionValue = option.value || option.name || option;
                        const optionTitle = option.title || option.name || optionValue;
                        const optionDesc = option.description || '';
                        const optionIcon = option.icon || '';
                        const isMultiSelect = currentStageData.type === 'dynamic-multi-select';
                        const isSelected = isMultiSelect
                            ? (selectedOptions[currentStage] || []).includes(optionValue)
                            : selectedOptions[currentStage] === optionValue;

                        return (
                            <div
                                key={index}
                                className={`option-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(optionValue)}
                            >
                                {optionIcon && (
                                    <div className={'circle'}>
                                        <img
                                            src={optionIcon}
                                            alt=""
                                            className="option-icon"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </div>
                                )}
                                <h3>{optionTitle}</h3>
                                {optionDesc && <p>{optionDesc}</p>}
                                {currentStageData.type === 'dynamic-multi-select' && (
                                    <span className="selected-tag">{isSelected ? <FcOk/> : <FcPlus/>}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {currentStageData.type === 'dynamic-multi-select' && (<div className="expand-toggle">
                        {(currentStageData.options[selectedRole] || []).length > VISIBLE_OPTIONS && (
                            <button className='toggle-btn' onClick={toggleExpand}>
                                {expanded ? ' - Show Less' : ` + View More Roles`}
                            </button>
                        )}
                        {(selectedOptions[currentStage] || []).length < 3 && (
                            <p className='selection-msg'>Please select at
                                least {3 - (selectedOptions[currentStage] || []).length} more interests</p>
                        )}
                    </div>
                )}

                <div className="navigation-buttons">
                    {currentStage > 0 && (
                        <button
                            className="back-button"
                            onClick={() => setCurrentStage(currentStage - 1)}
                        >
                            Back
                        </button>
                    )}
                    <button
                        className="continue-button"
                        onClick={handleContinue}
                        disabled={!validateCurrentStage()}
                    >
                        {isLastStage ? 'Complete Onboarding' : 'Continue'}
                    </button>
                </div>

                <div className="progress-indicator">
                    {onboardingData.stages.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-dot ${index <= currentStage ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OnboardingFlow;
