const fizzbuzz = () => {
    let counter = 0n;
  
    return {
      next: () => {
        counter++;
        const multiple_of_five = (counter % 5n) === 0n;
        const multiple_of_three = (counter % 3n) === 0n;
  
        if (multiple_of_five && multiple_of_three) {
          return 'FizzBuzz';
        }
  
        if (multiple_of_three) {
          return 'Fizz';
        }
  
        if (multiple_of_five) {
          return 'Buzz'
        }
  
        return counter;
      }
    }
  }
  
  const myFizzBazz = fizzbuzz();
  
  console.log(myFizzBazz.next()) // 1n
  console.log(myFizzBazz.next()) // 2n
  console.log(myFizzBazz.next()) // Fizz
  console.log(myFizzBazz.next()) // 4n
  console.log(myFizzBazz.next()) // Buzz