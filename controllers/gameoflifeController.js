// Controller for game of life-related operations

function initial(req, res) {
    const colonies = [null, "Jimmy", "Billy", "Frankie", "Spanky"];
    const colonyCount = colonies.length;
    const gridSize = 20;
    let grid = [];

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = Math.random() < 0.2 ? (Math.floor(1 + Math.random() * (colonyCount - 1))) : 0;
        }
    }

    const data = {
        colonies: colonies,
        grid: grid,
    };

    res.send(data);
}

module.exports = { initial };