import { useState } from "react";

function App() {
    const maximum = 7;
    const minimum = 2;
    const ammoOptions = [2, 3, 4, 5, 6, 7, 8];
    const defaultAmmunition = {
        maximum: maximum,
        ammunition: Array.from({ length: minimum }, () => ({ type: 'blank' })),
    };
    const [ammunition, setAmmunition] = useState(defaultAmmunition);
    const [selectedPositions, setSelectedPositions] = useState(Array(minimum).fill(null));

    const handleAddCartridge = () => {
        if (ammunition.ammunition.length < ammunition.maximum) {
            setAmmunition(prev => ({
                ...prev,
                ammunition: [...prev.ammunition, { type: 'blank' }]
            }));
            setSelectedPositions((prev) => [...prev, null]);
        }
    };

    const handleRemoveCartridge = () => {
        if (ammunition.ammunition.length > minimum) {
            setAmmunition(prev => ({
                ...prev,
                ammunition: prev.ammunition.slice(0, -1)
            }));
            setSelectedPositions((prev) => prev.slice(0, -1));
        }
    };

    const setCartridgeCount = (count) => {
        setAmmunition({
            ...ammunition,
            ammunition: Array.from({ length: count }, () => ({ type: 'blank' }))
        });
        setSelectedPositions(Array(count).fill(null));
    };

    const toggleCartridgeType = (index) => {
        const newAmmunition = { ...ammunition };
        newAmmunition.ammunition = [...ammunition.ammunition];
        newAmmunition.ammunition[index] = {
            ...newAmmunition.ammunition[index],
            type: newAmmunition.ammunition[index].type === 'blank' ? 'live' : 'blank',
        };
        setAmmunition(newAmmunition);
    };

    const toggleCartridgeSpecialType = (index) => {
        const newAmmunition = { ...ammunition };
        newAmmunition.ammunition = [...ammunition.ammunition];
        newAmmunition.ammunition[index] = {
            ...newAmmunition.ammunition[index],
            type: newAmmunition.ammunition[index].type === 'blank' ? 'blank_f'
                : newAmmunition.ammunition[index].type === 'live' ? 'live_f'
                    : newAmmunition.ammunition[index].type.endsWith('_f') ? newAmmunition.ammunition[index].type.slice(0, -2)
                        : newAmmunition.ammunition[index].type,
        };
        setAmmunition(newAmmunition);
    };

    const handleRestart = () => {
        setAmmunition({
            ...ammunition,
            ammunition: Array.from({ length: ammunition.ammunition.length }, () => ({ type: 'blank' })),
        });
        setSelectedPositions(Array(ammunition.ammunition.length).fill(null));
    };

    const liveCount = ammunition.ammunition.filter(cartridge => cartridge.type === 'live').length;
    const blankCount = ammunition.ammunition.filter(cartridge => cartridge.type === 'blank').length;
    const livePercentage = ((liveCount / (liveCount + blankCount)) * 100).toFixed(0);
    const blankPercentage = ((blankCount / (liveCount + blankCount)) * 100).toFixed(0);

    const toggleSelectedPosition = (index, type) => {
        setSelectedPositions((prev) => {
            const updated = [...prev];
            updated[index] = updated[index] === type ? null : type;
            return updated;
        });
    };

    return (
        <div className="flex flex-col items-center bg-[#282950] w-[100vw] h-[100vh] select-none">
            <div className="absolute top-4 flex flex-col items-center">
                <h1 className="text-[#F3F7FF] text-[50px] font-bold">Buckshot roulette Helper</h1>
                <a href="https://github.com/DenisGradov" target="_blank"
                   className="hover:text-[#946DFF] text-[14px] font-light text-[#9194C3] animate-tilt mb-4">
                    by Denys Hradov
                </a>
                <p className="text-[#9194C3] text-[18px] font-light mt-3">Quick Guide:</p>
                <h2 className="text-[#9194C3] mb-1">LBM - Select live ammunition</h2>
                <h2 className="text-[#9194C3]">RBM - Make a cartridge fired</h2>
            </div>
            <div className="flex flex-col items-center justify-center h-full mt-8">
                <div className="flex space-x-2 mb-4">
                    {ammoOptions.map((num) => (
                        <span
                            key={num}
                            className="text-[#F3F7FF] cursor-pointer text-[20px] select-none"
                            onClick={() => setCartridgeCount(num)}
                        >
                            {num}
                        </span>
                    ))}
                </div>
                <div className="w-full max-w-[400px] border-t border-[#9194C3] mb-4" />
                <div className="flex items-center mb-4">
                    <span
                        className="text-[#9194C3] cursor-pointer mr-2 text-[20px] select-none"
                        onClick={handleRemoveCartridge}
                    >
                        -
                    </span>
                    <div className="flex">
                        {ammunition.ammunition.map((cartridge, index) => (
                            <img
                                key={index}
                                className="w-[50px] cursor-pointer select-none"
                                src={
                                    cartridge.type === 'blank' ? 'blank.png' :
                                        cartridge.type === 'live' ? 'live.png' :
                                            cartridge.type === 'blank_f' ? 'blank_f.png' : 'live_f.png'
                                }
                                alt={cartridge.type}
                                onClick={() => toggleCartridgeType(index)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    toggleCartridgeSpecialType(index);
                                }}
                            />
                        ))}
                    </div>
                    <span
                        className="text-[#9194C3] cursor-pointer ml-2 text-[20px] select-none"
                        onClick={handleAddCartridge}
                    >
                        +
                    </span>
                </div>
                <div className="w-full max-w-[400px] border-t border-[#9194C3] mt-4 mb-4" />
                <div className="flex w-full max-w-[300px] h-[15px]">
                    {livePercentage > 0 && (
                        <div
                            className="bg-[#cb6d6f] h-full flex justify-center items-center text-white text-[12px] font-semibold select-none"
                            style={{ width: `${livePercentage}%` }}
                        >
                            {livePercentage}%
                        </div>
                    )}
                    {blankPercentage > 0 && (
                        <div
                            className="bg-[#4f4b4b] h-full flex justify-center items-center text-white text-[12px] font-semibold select-none"
                            style={{ width: `${blankPercentage}%` }}
                        >
                            {blankPercentage}%
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center mt-4 w-full max-w-[400px]">
                    <div className="flex justify-between w-full mb-2">
                        {selectedPositions.map((selected, index) => (
                            <div key={index} className="text-center">
                                <span className="text-[#9194C3] text-[12px]">{index + 1}</span>
                                <div className="flex justify-center mt-1">
                                    {['L', 'B'].map((type) => (
                                        <span
                                            key={type}
                                            className={`text-[12px] cursor-pointer mx-1 ${selected === type ? 'text-opacity-100 border-b-2 border-red-500' : 'opacity-40'}`}
                                            style={{ color: '#9194C3' }}
                                            onClick={() => toggleSelectedPosition(index, type)}
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleRestart}
                        className="mt-2 p-2 bg-[#9194C3] text-[#282950] font-bold rounded-md cursor-pointer select-none"
                    >
                        Restart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
