import * as React from 'react';
import fn from './functions'

function Color(){
const categories = [
    {name:'Red', value: "#ff0000"}, 
    {name: 'Green', value: "#008000"}, 
    {name:'Yellow', value:"#ffff00"}, 
    {name:'Blue', value:"#0000ff"}, 
    {name:'Brown', value:"#a52a2a"}, 
    {name:'Gray', value:"#808080"}, 
    {name:'Purple', value:"#800080"}, 
    {name:'Pink', value:"#ffc0cb"}, 
    {name:'Black', value:"#000000"}, 
    {name:'White', value:"#ffffff"},
    {name:'Orange', value:"#ffa500"},
    {name:'Cyan', value:"#00ffff"}
];

const [datas, setDatas] = React.useState(Array.apply(null, {length: 40}).map( () => fn.getRandomColor())); // Generate random colors and store it in datas
const [colors, setColors] = React.useState(datas); // Give intial state of random colors
const [darkers, setDarkers] = React.useState([]); // Give intial state of random colors
const [darker, setDarker] = React.useState(false); // Give initial state of darker

React.useEffect(() => {
    setDatas(datas)
}, []) // with [], datas just render one time when page first loaded

React.useEffect(() => {
    if(darker){
        setDarkers(fn.generateDarkerColors(colors))
    }
}, [darker]) // with [darker] dependency, darkers array will be updated only when darker value is changed

  
const handleChooseCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value){
        const results = [];
        for(const color of datas){
            const distance = fn.findDistanceBetweenTwoColors(fn.hexToRgb(event.target.value), fn.hexToRgb(color))
            if(distance < 100 ){
                results.push(color);
            }
        }
        setColors(results);
    } else {
        setColors(datas)
    }
};

const handleClickSaturation = async () => {
    setDarker(!darker);    
};

  return (
    <div>   
        <div>
            <span>Filtered by category  </span>
            <select 
            onChange={handleChooseCategory}
            >
                <option value="">All</option>
                {categories.map( (category: {name: string, value:string}, index: number) => (
                <option key={index} value={category.value}>{category.name}</option>
                ))}
            </select>
        </div>
        <br/>
        <div>
            <input type="checkbox" onChange={handleClickSaturation} /> Darker
        </div>
        <div className="flex-4">
        { 
            darker ?
            darkers.filter( element => element ).map( (color: string, index: number) => (
                <div key={index} className="color-element" style={{ backgroundColor: color }} />
            ))
            :
            colors.map( (color: string, index: number) => (
            <div key={index} className="color-element" style={{ backgroundColor: color }} />
        ))
    }
        </div>
    </div>
  );
}

export default Color;
