import { render, screen, waitFor } from 'utils/test-utils'

import userEvent from '@testing-library/user-event'

import Checkbox from '.'

describe('<Checkbox />', () => {
  it('should render with label', () => {
    const { container } = render(
      <Checkbox label="checkbox label" labelFor="check" />
    )

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument()
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('it should render without label', () => {
    render(<Checkbox />)

    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument()
  })

  it('it should render with black label', () => {
    render(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />
    )

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: '#030517'
    })
  })

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()

    render(<Checkbox label="Checkbox" onCheck={onCheck} />)

    expect(onCheck).not.toHaveBeenCalled()

    userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })
    expect(onCheck).toHaveBeenCalledWith(true)
  })

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()

    render(<Checkbox label="Checkbox" onCheck={onCheck} isChecked />)

    expect(onCheck).not.toHaveBeenCalled()

    userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })
    expect(onCheck).toHaveBeenCalledWith(false)
  })

  it('should be accesible with tab', () => {
    render(<Checkbox label="Checkbox" labelFor="Checkbox" />)

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus()
  })
})
