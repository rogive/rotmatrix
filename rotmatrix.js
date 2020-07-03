const mat1 = [[1, 2, 3, 4],
             [5, 6, 7, 8],
             [9, 10, 11, 12],
             [13, 14, 15, 16]], // 4 x 4
             r1 = 2;

const mat2 = [[ 1,  2,  3,  4,  5,  6],
              [ 7,  8,  9, 10, 11, 12],
              [13, 14, 15, 16, 17, 18],
              [19, 20, 21, 22, 23, 24],
              [25, 26, 27, 28, 29, 30],
              [31, 32, 33, 34, 35, 36],
              [37, 38, 39, 40, 41, 42],], // 7 x 6
             r2 = 5;
const mat3 = [[ 1,  2,  3,  4,  5,  6,  7],
              [ 8,  9, 10, 11, 12, 13, 14],
              [15, 16, 17, 18, 19, 20, 21],
              [22, 23, 24, 25, 26, 27, 28],
              [29, 30, 31, 32, 33, 34, 35],
              [36, 37, 38, 39, 40, 41, 42]],  // 6 x 7
             r3 = 15;


function matrixRotation(matrix, r) {

    let a, b, i, j, k, l, mCad, nCad,
    factorRot = [],
    longCadenas = [],
    m = matrix.length,
    n = matrix[0].length,
    numCadenas = Math.min(m, n)/2,
    matrix2 = Array.from(Array(numCadenas), () => new Array()),
    matrix3 = Array.from(Array(numCadenas), () => new Array()),
    matrix4 = Array.from(Array(m), () => new Array(n));
    for(i = 0; i < numCadenas; i++){
        longCadenas[i] = 2*m+2*n-8*i-4;
        a = r % longCadenas[i];
        factorRot[i] = a < 0 ? r : a === 0 ? 0 : a;
    }
// Asignacion de Cadenas de Patrones
    for(i = 0; i < numCadenas; i++){
        for(j = 0; j < longCadenas[i]; j++){
            if (j < (n - 2 * i)){
                matrix2[i][j] = [i, (j + i)];
            } else if (j < (n - 2 * i) + (m - 2 * i) - (1) ){
                matrix2[i][j] = [(j + i) - (n - 2 * i) + (1), (n - 2 * i) - (1) + i];
            } else if (j < 2 * (n - 2 * i) + (m - 2 * i) - (2)){
                matrix2[i][j] = [(m - 2 * i) - 1 + i, 2 * (n - 2 * i) + (m - 2 * i) - 2 - j - 1 + i];
            } else if (j < 2 * (n - 2 * i) + 2 * (m - 2 * i) - 3){
                matrix2[i][j] = [ 2 * (m - 2 * i) + 2 * (n - 2 * i) - 3 - j - 1 + i, i];
            }
            
        }
    }

// Asignacion de Cadenas de Patrones modificados por la rotación
for(i = 0; i < numCadenas; i++){
    for(j = 0; j < longCadenas[i]; j++){
        if (factorRot[i] + j < longCadenas[i]){
            b = (factorRot[i] + j);
            matrix3[i][j] = matrix2[i][b];
        } else {
            b = ((factorRot[i] + j) % longCadenas[i]) ;
            matrix3[i][j] = matrix2[i][b];         
        }   
    }
}

for(i = 0; i < m; i++){
    for(j = 0; j < n; j++){
        if ((j >= i) && (j < n - i) && (i < numCadenas)){
            matrix4[i][j] = matrix[matrix3[i][j-i][0]][matrix3[i][j-i][1]];
        } else if ((j >= ((m-1) - i)) && (j < (n-((m-1)-i))) & (((m-1)-i) < numCadenas)){
           matrix4[i][j] = matrix[matrix3[(m-1)-i][( (m-2*((m-1)-i)) + (n-2*((m-1)-i)-2) +  ((n-1)-j-((m-1)-i)) )][0]][matrix3[(m-1)-i][( (m-2*((m-1)-i)) + (n-2*((m-1)-i)-2) +  ((n-1)-j-((m-1)-i)) )][1]];
        } else if (( j < i ) && (j < numCadenas)){
            matrix4[i][j] = matrix[matrix3[j][( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) )][0]][matrix3[j][( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) )][1]];
        } else {
            matrix4[i][j] = matrix[matrix3[(n-1-j)][ ((n-2*(n-1-j)) + (i - (n-1-j)) - 1) ][0]][matrix3[(n-1-j)][ ((n-2*(n-1-j)) + (i - (n-1-j)) - 1) ][1]];
        }
    }
}

//imprimir en el formato solicitado
for(i = 0; i < m; i++){
    console.log(matrix4[i].join(" "));
}
return matrix4;
}



console.log(matrixRotation(mat3, r1));