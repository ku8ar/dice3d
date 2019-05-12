import React, { useCallback, useState } from 'react'

const fontFamily = 'system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'

const avNumbers = [1, 2, 3, 4, 5, 6]

const Btn = ({ onClick, children, backgroundColor = 'transparent' }) => (
  <button onClick={onClick}
    style={{ color: 'white', border: '1px solid white', backgroundColor, width: 'auto', height: '2.5rem', maxHeight: '2.5rem', fontSize: '1.3rem', flex: '1' }}>
    {children}
  </button>
)

const CheatBtn = ({ number, index, editRow, isSelected }) => (
  <Btn
    onClick={useCallback(() => editRow(index, number), [editRow, index, number])}
    backgroundColor={isSelected ? 'blue' : 'transparent'}>
    {number || 'rand.'}
  </Btn>
)

const CheatRow = ({ editRow, removeRow, index, num }) => (
  <div style={{ display: 'flex' }}>
    <CheatBtn number={0} index={index} editRow={editRow} isSelected={!num} />
    {avNumbers.map((avNum, key) => <CheatBtn key={key} number={avNum} index={index} editRow={editRow} isSelected={avNum === num} />)}
    <Btn index={index} onClick={useCallback(() => removeRow(index), [removeRow, index])} backgroundColor='red'>-</Btn>
  </div>
)

const Cheats = ({ cheatList, setCheat }) => {
  const [isOpen, setVisibility] = useState(false)
  const setOpen = useCallback(() => setVisibility(true), [])
  const setClose = useCallback(() => setVisibility(false), [])

  const editRow = useCallback((editedKey, newNum) => setCheat(cheatList.map((num, key) => key === editedKey ? newNum : num)), [cheatList, setCheat])
  const removeRow = useCallback((removedKey) => setCheat(cheatList.filter((_, key) => key !== removedKey)), [cheatList, setCheat])
  const addRow = useCallback(() => setCheat([...cheatList, 0]), [cheatList, setCheat])

  return (
    <>
      <div style={{ fontFamily, color: '#d8d8d8', position: 'absolute', bottom: '0', height: '100px', width: '100%', backgroundColor: 'rgba(245, 245, 245, 0.3)' }}>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>Advertisement</div>
        <hr />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '20px' }}>
            <div>Shangri La Casino</div>
            <div>100+ Online Games!</div>
          </div>
          <button onClick={setOpen} style={{ fontSize: '40px', backgroundColor: 'transparent', border: 'none' }}>
            <span role='img' aria-label='lol'>➡️</span>
          </button>
        </div>
      </div>
      {isOpen && (
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#008000', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Btn onClick={setClose}>X</Btn>
          <div style={{ flex: '1' }}>
            {cheatList.map((num, key) =>
              <CheatRow key={key} index={key} editRow={editRow} removeRow={removeRow} num={num} />
            )}
            <Btn onClick={addRow} style={{ fontSize: '40px', marginTop: '40px' }}>+ Add</Btn>
          </div>
          <Btn onClick={setClose}>X</Btn>
        </div>
      )}
    </>
  )
}

export default Cheats