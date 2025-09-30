 let player = 'X';
        let gb = [['','',''], ['','',''], ['','','']];
        let scoreX = 0;
        let scoreO = 0;
        let scoreDraw = 0;
        let gameActive = true;
        const cellMap = [
            [0,0], [0,1], [0,2],
            [1,0], [1,1], [1,2],
            [2,0], [2,1], [2,2]
        ];

        function winner() {
            // Check rows
            for (let i = 0; i < 3; i++) {
                if (gb[i][0] !== '' && gb[i][0] === gb[i][1] && gb[i][1] === gb[i][2]) {
                    highlightWinner([[i,0], [i,1], [i,2]]);
                    return true;
                }
            }
            // Check columns
            for (let i = 0; i < 3; i++) {
                if (gb[0][i] !== '' && gb[0][i] === gb[1][i] && gb[1][i] === gb[2][i]) {
                    highlightWinner([[0,i], [1,i], [2,i]]);
                    return true;
                }
            }
            // Check diagonal (top-left to bottom-right)
            if (gb[0][0] !== '' && gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) {
                highlightWinner([[0,0], [1,1], [2,2]]);
                return true;
            }
            // Check diagonal (top-right to bottom-left)
            if (gb[0][2] !== '' && gb[0][2] === gb[1][1] && gb[1][1] === gb[2][0]) {
                highlightWinner([[0,2], [1,1], [2,0]]);
                return true;
            }
            return false;
        }

        function highlightWinner(cells) {
            cells.forEach(([row, col]) => {
                const cellIndex = row * 3 + col;
                document.getElementById(cellIndex.toString()).classList.add('winner');
            });
        }

        function drawmatch() {
            for(let i=0; i<3; i++) {
                for(let j=0; j<3; j++) {
                    if(gb[i][j] === "") {
                        return false;
                    }
                }
            }
            return true;
        }

        function clearBoard() {
            for(let i=0; i<9; i++) {
                const cell = document.getElementById(i.toString());
                cell.innerHTML = "";
                cell.disabled = false;
                cell.classList.remove('x', 'o', 'winner');
            }
            gb = [['','',''], ['','',''], ['','','']];
        }

        function newRound() {
            clearBoard();
            document.getElementById("result").innerHTML = "Let's Begin";
            player = 'X';
            gameActive = true;
        }

        function resetAll() {
            clearBoard();
            scoreX = 0;
            scoreO = 0;
            scoreDraw = 0;
            updateScore();
            document.getElementById("result").innerHTML = "Let's Begin";
            player = 'X';
            gameActive = true;
        }

        function updateScore() {
            document.getElementById('scoreX').textContent = scoreX;
            document.getElementById('scoreO').textContent = scoreO;
            document.getElementById('scoreDraw').textContent = scoreDraw;
        }

        function handleCellClick(index) {
            if (!gameActive) return;
            
            const [row, col] = cellMap[index];
            
            if(gb[row][col] === '') {
                gb[row][col] = player;
                const cell = document.getElementById(index.toString());
                cell.innerHTML = player;
                cell.classList.add(player.toLowerCase());
                cell.disabled = true;
                
                if (winner()) {
                    document.getElementById("result").innerHTML = `Player ${player} Wins!`;
                    if (player === 'X') {
                        scoreX++;
                    } else {
                        scoreO++;
                    }
                    updateScore();
                    gameActive = false;
                    
                    // Auto start new round after 2 seconds
                    setTimeout(() => {
                        if (!gameActive) {
                            newRound();
                        }
                    }, 2000);
                } else if (drawmatch()) {
                    document.getElementById("result").innerHTML = "It's a Draw!";
                    scoreDraw++;
                    updateScore();
                    gameActive = false;
                    
                    // Auto start new round after 2 seconds
                    setTimeout(() => {
                        if (!gameActive) {
                            newRound();
                        }
                    }, 2000);
                } else {
                    player = player === 'X' ? 'O' : 'X';
                    document.getElementById("result").innerHTML = `Player ${player}'s Turn`;
                }
            }
        }

        // Initialize cell click handlers
        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(index));
        });