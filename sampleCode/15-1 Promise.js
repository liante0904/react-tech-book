function printLater(number) {
    setTimeout(
        function() {
            console.log(number);
        }, 
        1000
    );
}
printLater(1);


function printLater(number, fn) {
    setTimeout(
        function() {
            console.log(number);
            if(fn) fn();
        }, 
        1000
    );
}
/** callback hell */
printLater(1, function() {
    printLater(2, function() {
        printLater(3, function() {
            printLater(4);
        })    
    })
    
})
/** Promise */
function printLater(number) {
    return new Promise( // 새 Promise를 만들어서 리턴합니다.
        resolve => {
            setTimeout( // 1초 뒤 실행하도록 설정
                () => {
                    console.log(number);
                    resolve(); // promise가 끝났음을 알립니다.
                }, 
                1000
            );
        
        }
    )
}
printLater(1)
 .then( () => printLater(2))
 .then( () => printLater(3))
 .then( () => printLater(4))


 /** try catch */
 function printLater(number) {
    return new Promise( // 새 Promise를 만들어서 리턴합니다.
        (resolve, reject) => {
            if(number > 4) return reject('number is greater than 4');

            setTimeout( // 1초 뒤 실행하도록 설정
                () => {
                    console.log(number);
                    resolve(number + 1); // 현재 숫자에 1을 더한 값을 반환
                }, 1000);
        }
    )
}
printLater(1)
    .then( num => printLater(num) ) // 2
    .then( num => printLater(num) ) // 3
    .then( num => printLater(num) ) // 4
    .then( num => printLater(num) ) // 5 (catch)
    .catch(e => console.log(e));