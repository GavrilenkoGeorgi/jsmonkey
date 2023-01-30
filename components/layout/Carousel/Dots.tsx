import { MouseEventHandler } from 'react'

const dots = (onClickHandler: MouseEventHandler<HTMLButtonElement>,
  isSelected: boolean,
  index: number,
  label: string) => {

  const defStyle = {
    margin: '.4rem',
    color: 'lightgray',
    cursor: 'pointer',
    fontSize: '150%',
    transition: 'color .5s ease-in'
  }

  const style = isSelected
    ? { ...defStyle, color: 'gray' }
    : { ...defStyle }

  return <span
    style={style}
    onClick={onClickHandler}
    // onKeyDown={onClickHandler}
    key={index}
    role='button'
    tabIndex={0}
    aria-label={`${label} ${index + 1}`}
  >
    ■
  </span>
}

export default dots
