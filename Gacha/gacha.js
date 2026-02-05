const Rarities = [
    { name: 'common', rate: 0.6 },
    { name: 'rare', rate: 0.3 },
    { name: 'epic', rate: 0.09 },
    { name: 'legendary', rate: 0.01 }
];

const inventory = {};
let totalPulls = 0;
let pityCounter = 0;
const pity_limit = 50;
Rarities.forEach(r => inventory[r.name] = 0);


function pullGacha() {
    selectedRarity = '';
    if (pityCounter >= pity_limit) {
        selectedRarity = 'legendary';
        console.log(">> Pity Reached : Guaranteed Legendary");
        pityCounter = 0;
        return selectedRarity;
    }

    const random_Value = Math.random();
    let cumulativeRAte = 0;

    for ( const item of Rarities ) {
        cumulativeRAte += item.rate;

        if (random_Value <= cumulativeRAte) {
            selectedRarity = item.name;
            
            if (selectedRarity === 'legendary') {
                pityCounter = 0;
            }else{
                pityCounter++;
            }
            break
        }
    }
    return selectedRarity;
}

function updateState(rarity){
    if(inventory[rarity]){
        inventory[rarity] += 1;
    }else{
        inventory[rarity] = 1;
    }
    totalPulls += 1;
}
function display_Pull(rarity){
    console.log(`Pull #${totalPulls}: ${rarity.toUpperCase()} | Pity Counter: ${pityCounter}/${pity_limit}`);
}

function display_Summary(){
    console.log("\n-----Final Inventory-----");
    console.table(inventory);
    console.log(`Total Pulls: ${totalPulls}`);
    
}

function runSimulation(numberOfPulls) {
    console.log(`Starting Gacha Simulation for ${numberOfPulls} pulls...\n`);
    for (let i = 0; i < numberOfPulls; i++) {
        const result = pullGacha();
        updateState(result);
        display_Pull(result);
    }
    display_Summary();
}


var pulls = 51;
runSimulation(pulls);
    