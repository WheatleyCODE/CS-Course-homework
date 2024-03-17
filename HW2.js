const program = [
    ['SET', 'A', 10],
    ['PRINT', 'A'],
    ['IF', 'A', '==', 0],
    ['RET', 0],
    ['DEC', 'A'],
    ['JMP', 1],
    ['END']
  ];
  
  const program2 = [
    ['SET', 'B', 0],
    ['PRINT', 'B'],
    ['IF', 'B', '<', 9],
    ['RET', 0],
    ['INC', 'B'],
    ['JMP', 1],
    ['END']
  ];
  
  const interpreter = (program) => {
    const ifSigns = {
      "==": (a, b) => a == b,
      ">": (a, b) => a > b,
      "<": (a, b) => a > b,
    }
  
    const vars = {};
  
    let currentAction
    let params = []
    let ifValue;
    let cursor = 0;
  
    const clear = () => {
      currentAction = undefined;
      params = [];
    }
  
    const startAction = (action) => {
      if (currentAction) {
        throw new Error(`Syntax Error: ${currentAction} command`)
      }
      
      currentAction = action;
    }
  
    const actions = {
      'SET': (val) => {
        if (params.length < 1) {
          params.push(val);
          return;
        }
  
        vars[params[0]] = val
      },
      'PRINT': (val) => {
        console.log('log:', vars[val])
      },
      'IF': (val) => {
        if (params.length < 2) {
          params.push(val);
          return;
        }
        
        const getCompleteIf = () => {
          const savePrams = [...params, val];
          return () => ifSigns[savePrams[1]](vars[savePrams[0]], savePrams[2])
        }
  
        ifValue = getCompleteIf()
      },
      'DEC': (val) => {
        vars[val] -= 1;
      },
      'INC': (val) => {
        vars[val] += 1;
      },
      'RET': (val) => {
        if (ifValue()) {
          ifValue = undefined;
          return val;
        }
      },
      'END': () => {
        return 'Program end'
      },
      'JMP': (val) => {
        cursor = val;
      }
    }
  
    while(cursor < program.length) {
      let line = program[cursor];
      cursor += 1;
  
      for (let j = 0; j < line.length; j++) {
        const value = line[j];
  
        if (currentAction) {
          const ret = actions[currentAction](value);
  
          if (ret !== undefined) {
            console.log('return', ret);
            return;
          }
        } else {
          startAction(value);
          continue;
        }
      }
  
      clear();
    }
  };
  
  interpreter(program);
  interpreter(program2);