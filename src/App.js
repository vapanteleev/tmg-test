import React,{Component} from 'react';

class App extends Component {
  state = {
    data: '',
    value: [],
    indexes:[],
    mock: [1, 2, 3, 4, 5],
    texts: [],
    error:false
  }

  async getData(id) {
    
    
   const response =  await fetch(`http://tmgwebtest.azurewebsites.net/api/textstrings/${id}`, {
  headers: {
    "TMG-Api-Key":"0J/RgNC40LLQtdGC0LjQutC4IQ=="
  }
 }
   )
  const data = await response.json()

    this.setState({
   data:data.text
    })

     this.setState(state => {
      const texts = state.texts.concat(data.text);
 
      return {
        texts,
       
      };
    });

  }
  getVowels(str) {
  var vowelsCount = 0;

  var string = str.toString();

 for (var i = 0; i <= string.length - 1; i++) {

    if (string.charAt(i) === "a" || string.charAt(i) === "e" || string.charAt(i) === "i" || string.charAt(i) === "o" || string.charAt(i) === "u" ||string.charAt(i) === "а" ||string.charAt(i) === "е"||string.charAt(i) === "ё" ||string.charAt(i) === "и" ||string.charAt(i) === "о"||string.charAt(i) === "у"||string.charAt(i) === "ы"||string.charAt(i) === "э"||string.charAt(i) === "ю"||string.charAt(i) === "я") {
      vowelsCount += 1;
    }
  }
  return vowelsCount;
  }

   handleChange = (event) =>{
     this.setState({ value: event.target.value });

      console.log(this.state.value)
   }
  
  handleSubmit = (event) => {
    try {
       event.preventDefault();

    console.log(this.state.texts)
    this.setState({
      value: [],
      texts:[]
    })
    this.setState({
      value: this.state.value.split(',')
    })
    this.getArrayOfTexts()
        alert('Введенные индексы: ' + this.state.value);

    console.log('indexes: ', this.state.indexes)

    }
    catch (e) {
      this.setState({
        error:true
      })
    }
    

   


  }
  getArrayOfTexts = () => {
    if (this.state.value.includes(',')) {
      this.state.value.split(',').forEach((element) => {
      this.getData(element);
      
})
    }

     if (this.state.value.includes(';')) {
      this.state.value.split(';').forEach((element) => {
      this.getData(element);
      
})
    }


    
  }
  // componentDidMount() {
  //   this.getData(3)
  // }
  

  
  render() {
    return (
    
    <div className="App">
        {this.state.error  ? <><h1>Ошибка! Введите идентификаторы через ';' или ','. </h1> </> :
          <div className="container" >
        
      <form onSubmit={this.handleSubmit}><label htmlFor="">Идентифифкаторы строк:</label> <input type="text" value={this.state.value} onChange={this.handleChange} /><button >Подсчитать</button></form>

      
      <table border="3px" >

        <thead>
              <tr>
                              
        <th>Текст</th>
        <th>Количество слов</th>
                <th>Количество гласных</th>
            </tr>
        </thead>
          <tbody>
           
              {this.state.texts.map((item, index) => (
                <tr key={index + item}>

            <td >{item}</td>
                  <td> {item.split(' ').length}</td>
                  <td>{this.getVowels(item)}</td>
          </tr>
              )) }
                   
                
              

            
        
          
        </tbody>

        
        </table>
        </div>
      }
     
    </div>
  );
}
  }


export default App;



