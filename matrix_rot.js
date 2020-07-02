const mat1 = [[1, 2, 3, 4],
             [5, 6, 7, 8],
             [9, 10, 11, 12],
             [13, 14, 15, 16]], // 4 x 4
             r1 = 2;
/*
m[0][0] m[0][1] m[0][2] m[0][3]                 m[0][0]  m[0][1]  m[0][2]  m[0][3]      [3,   4,   8,  12]
m[1][0] m[1][1] m[1][2] m[1][3]                 m[0][11] m[1][0]  m[1][1]  m[0][4]      [2,  11,  10,  16]
m[2][0] m[2][1] m[2][2] m[2][3]     12, 4       m[0][10] m[1][3]  m[1][2]  m[0][5]      [1,   7,   6,  15]
m[3][0] m[3][1] m[3][2] m[3][3]     4 x 4       m[0][9]  m[0][8]  m[0][7]  m[0][6]      [5,   9,  13,  14]
( 2, 1) ( 1, 1) ( 4)                            ( 2, 1) ( 1, 3) ( 7)
( 2, 2) ( 1, 0) ( 3)                            ( 2, 2) ( 1, 2) ( 11)
( 3, 0) ( 0, 3) ( 10)                           ( 3, 0) ( 0, 9) ( 5)
( 3, 1) ( 0, 2) ( 9)                            ( 3, 1) ( 0, 8) ( 9)
( 3, 2) ( 0, 1) ( 8)                            ( 3, 2) ( 0, 7) ( 13)
( 3, 3) ( 0, 0) ( 7)                            ( 3, 3) ( 0, 6) ( 14)







*/
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
console.log("\n" + matrix2 + "\n");
console.log("\n" + matrix3 + "\n");
// Asignacion a la matrix final
console.log("\n" + "Debugger: " + "\n");
/*
for(i = 0; i < m; i++){
    for(j = 0; j < n; j++){
        matrix4[i][j] = 0;
    }
}
*/
//console.log(matrix3);
for(i = 0; i < m; i++){
    for(j = 0; j < n; j++){
        if ((j >= i) && (j < n - i) && (i < numCadenas)){
            matrix4[i][j] = matrix[matrix3[i][j-i][0]][matrix3[i][j-i][1]];
        } else if ((j >= ((m-1) - i)) && (j < (n-((m-1)-i))) & (((m-1)-i) < numCadenas)){
            //console.log("( " + i + ", " + j + ")");
            //console.log("( " + ((m-1)-i) + ", " + ((n-1)-j-((m-1)-i)) + ")");
            //console.log("( " + i + ", " + j + ") " + "[ (" + ((m-1)-i)  + "), " + "{" + ((m-2*((m-1)-i)) + (n-2*((m-1)-i)-2) +  ((n-1)-j-((m-1)-i))) + "} => ( " + (m-2*((m-1)-i)) + ")+( " + (n-2*((m-1)-i)-1)  + ")+( " +  ((n-1)-j-((m-1)-i)) + ")]");
            //console.log("( " + i + ", " + j + ") " + "( " + ((m-1)-i) + ", " + ((n-1)-j-((m-1)-i)) + ") " + "( " + ( (m-2*((m-1)-i)) + (n-2*((m-1)-i)-1) +  ((n-1)-j-((m-1)-i)) ) + ")");
            matrix4[i][j] = matrix[matrix3[(m-1)-i][( (m-2*((m-1)-i)) + (n-2*((m-1)-i)-2) +  ((n-1)-j-((m-1)-i)) )][0]][matrix3[(m-1)-i][( (m-2*((m-1)-i)) + (n-2*((m-1)-i)-2) +  ((n-1)-j-((m-1)-i)) )][1]];
        } else if (( j < i )){
            //console.log("( " + i + ", " + j + ")");
            //console.log("( " + matrix3[j][( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) )][0] + ", " + ((n-1)-j-((m-1)-i)) + ")");
            //console.log("( " + i + ", " + j + ") " + "[ (" + ((m-1)-i)  + "), " + "{" + ((m-2*((m-1)-i)) + (n-2*((m-1)-i)-2) +  ((n-1)-j-((m-1)-i))) + "} => ( " + (m-2*((m-1)-i)) + ")+( " + (n-2*((m-1)-i)-1)  + ")+( " +  ((n-1)-j-((m-1)-i)) + ")]");
            
            console.log("( " + i + ", " + j + ") " + "( " + j + ", " + ( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) ) + 
            ") " + "( " + 2*(n-2*(j)) +")( " +  (m-2*(j)-3) + ") " + "( " + ((m-1)-i-j) + ")  " +
            "( " + matrix3[j][( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) )][0] + ", " + ((n-1)-j-((m-1)-i)) + ")");
            //matrix4[i][j] = 0;
            //matrix4[i][j] = matrix[matrix3[j][( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) )][0]][matrix3[matrix3[j][( 2*(n-2*(j)) + (m-2*(j)-3) + ((m-1)-i-j) )][1]]];
        } else if (a === 0){
            //matrix4[k][l] = matrix[][];
        }
    }
}
/*

m[0][0] m[0][1] m[0][2] m[0][3]  m[0][4] m[0][5]
m[1][0] n[1][1] n[1][2] n[1][3]  n[1][4] m[1][5]
m[2][0] n[2][1] o[2][2] o[2][3]  n[2][4] m[2][5]
m[3][0] n[3][1] o[3][2] o[3][3]  n[3][4] m[3][5]
m[4][0] n[4][1] o[4][2] o[4][3]  n[4][4] m[4][5]
m[5][0] n[5][1] n[5][2] n[5][3]  n[5][4] m[5][5]   22, 14, 6    
m[6][0] m[6][1] m[6][2] m[6][3]  m[6][4] m[6][5]   7 x 6 

m[0][0] m[0][1] m[0][2] m[0][3]
m[1][0] m[1][1] m[1][2] m[1][3]
m[2][0] m[2][1] m[2][2] m[2][3]     12, 4
m[3][0] m[3][1] m[3][2] m[3][3]     4 x 4

m[0][0] m[0][1] m[0][2] m[0][3]  m[0][4] m[0][5]  m[0][6]
m[1][0] n[1][1] n[1][2] n[1][3]  n[1][4] n[1][5]  m[1][6]
m[2][0] n[2][1] o[2][2] o[2][3]  o[2][4] n[2][5]  m[2][6]
m[3][0] n[3][1]-o[3][2] o[3][3]  o[3][4] n[3][5]  m[3][6]
m[4][0] n[4][1] n[4][2] n[4][3]  n[4][4] n[4][5]  m[4][6]   22, 14, 6
m[5][0] m[5][1] m[5][2] m[5][3]  m[5][4] m[5][5]  m[5][6]   6 x 7
*/

console.log("\n" + "La longitud de las cadenas son: " + longCadenas + "\n");
console.log("Los factores son: " + factorRot + "\n");
console.log(matrix2);
console.log(matrix3);
console.log("Matrix Final: ");
console.log(matrix4);
return 0;

}
/*    
2*m+2*n-4
m[0][0] m[0][1]     4, 0
m[1][0] m[1][1]     2 x 2

m[0][0] m[0][1] m[0][2] m[0][3]
m[1][0] m[1][1] m[1][2] m[1][3]
m[2][0] m[2][1] m[2][2] m[2][3]     12, 4
m[3][0] m[3][1] m[3][2] m[3][3]     4 x 4

m[0][0] m[0][1] m[0][2] m[0][3]  m[0][4] m[0][5]  m[0][6]
m[1][0] n[1][1] n[1][2] n[1][3]  n[1][4] n[1][5]  m[1][6]
m[2][0] n[2][1] o[2][2] o[2][3]  o[2][4] n[2][5]  m[2][6]
m[3][0] n[3][1] o[3][2] o[3][3]  o[3][4] n[3][5]  m[3][6]
m[4][0] n[4][1] n[4][2] n[4][3]  n[4][4] n[4][5]  m[4][6]   22, 14, 6
m[5][0] m[5][1] m[5][2] m[5][3]  m[5][4] m[5][5]  m[5][6]   6 x 7

m[0][0] m[0][1] m[0][2] m[0][3]  m[0][4] m[0][5]
m[1][0] n[1][1] n[1][2] n[1][3]  n[1][4] m[1][5]
m[2][0] n[2][1] o[2][2] o[2][3]  n[2][4] m[2][5]
m[3][0] n[3][1] o[3][2] o[3][3]  n[3][4] m[3][5]
m[4][0] n[4][1] o[4][2] o[4][3]  n[4][4] m[4][5]
m[5][0] n[5][1] n[5][2] n[5][3]  n[5][4] m[5][5]   22, 14, 6    
m[6][0] m[6][1] m[6][2] m[6][3]  m[6][4] m[6][5]   7 x 6
*/

console.log(matrixRotation(mat3, r1));
//mat1 - r1 ---> Bien Ec1, Ec2
//mat1 - r2 ---> 
//mat1 - r3 ---> 
//mat2 - r1 ---> 
//mat2 - r2 ---> EL arreglo del centro no se asigno
//mat2 - r3 ---> EL arreglo del centro no se asigno
//mat3 - r1 ---> 
//mat3 - r2 ---> Bien Ec1, Ec2
//mat3 - r3 ---> Bien Ec1, Ec2


//////////////////////////////////

