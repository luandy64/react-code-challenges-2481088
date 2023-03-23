import Color from './Color'

const colors = [{
  hex: '#91A6FF',
  name: 'Cornflower Blue'
},
{
  hex: '#FF88DC',
  name: 'Persian Pink'
},
{
  hex: '#80FF72',
  name: 'Screamin Green'
},
{
  hex: '#FF5154',
  name: 'Tart Orange'
}]

export default function ColorRenderer () {
  return (
      <div>
          {
              colors.map(
                  x => <Color 
                           key={x.hex}
                           hex={x.hex}
                           name={x.name}/>
              )
          }
      </div>
  )
}
