const fn = {
    componentToHex : (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },
    findDarker : (rgbColor: { r: number; g: number; b: number; }) => {
        const {r,g,b} = rgbColor
        const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
        return hsp <= 127.5 ? fn.rgbToHex(rgbColor) : null
    },
    findDistanceBetweenTwoColors : (color1 : {r: number, g: number, b: number}, color2 : {r: number, g: number, b: number}) => {
        let d = 0;
        for (const el in color1) {
            if(color1[el] !== null && color2[el] !== null){
                d += (color1[el] - color2[el])*(color1[el] - color2[el]);
            }
        }
        return Math.sqrt(d);
    },
    generateDarkerColors : (arr: any) => {
        const rgbColors = arr.map( (color: string) => fn.hexToRgb(color) )
        const darkerColors = rgbColors.map( (color: { r: number; g: number; b: number; }) => fn.findDarker(color) )
        return darkerColors
    }, 
    getRandomColor : () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    hexToRgb : (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            b: parseInt(result[3], 16),
            g: parseInt(result[2], 16),
            r: parseInt(result[1], 16),
        } : { b: 0, g: 0, r: 0};
    },
    rgbToHex : (rgbColor: { r: number; g: number; b: number; }) => {
        const {r,g,b} = rgbColor
        return "#" + fn.componentToHex(r) + fn.componentToHex(g) + fn.componentToHex(b);
    }
}

export default fn;