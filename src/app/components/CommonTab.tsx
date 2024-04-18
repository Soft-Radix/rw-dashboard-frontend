import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabProps {
    tabs: Tab[];
}

const TabComponent: React.FC<TabProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="">
            <div className="flex justify-left gap-[30px] mb-[4rem] flex-wrap px-[2rem]">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${activeTab === tab.id
                            ? 'border-b-[3px] border-secondary text-secondary'
                            : 'border-b border-transparent'
                            } py-2 pr-[10px] focus:outline-none text-[1.8rem] font-500`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-4">{tabs.find(tab => tab.id === activeTab)?.content}</div>
        </div>
    );
};

export default TabComponent;
