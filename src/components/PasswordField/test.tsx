import { render, screen, waitFor } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

import PasswordField from '.'

describe('<PasswordField />', () => {
  it('should show visibility toggle only when at least one letter is typed', async () => {
    render(<PasswordField label="PasswordField" />)

    const btnToggleShowPassword = screen.getByRole('img', {
      name: /show password/i
    })

    expect(btnToggleShowPassword).not.toBeVisible()

    const input = screen.getByTestId(/password-input/i)
    const text = 'This is my new text'
    userEvent.type(input, text)

    expect(btnToggleShowPassword).toBeVisible()

    userEvent.click(btnToggleShowPassword)
    await waitFor(() => {
      expect(
        screen.getByRole('img', { name: /hide password/i })
      ).toBeInTheDocument()
    })
  })

  it('should render with label', () => {
    render(<PasswordField label="label" name="Label" />)

    expect(screen.getByLabelText('label')).toBeInTheDocument()
  })

  it('should render without label', () => {
    render(<PasswordField />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    render(<PasswordField placeholder="hey you" />)

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('should change its value when typing', async () => {
    const onInputChange = jest.fn()
    render(
      <PasswordField
        onInputChange={onInputChange}
        label="PasswordField"
        name="PasswordField"
      />
    )

    const input = screen.getByTestId(/password-input/i)
    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInputChange).toHaveBeenCalledTimes(text.length)
    })
    expect(onInputChange).toHaveBeenCalledWith(text)
  })

  it('should be accesible using tab', () => {
    render(<PasswordField label="PasswordField" name="PasswordField" />)

    const input = screen.getByLabelText('PasswordField')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should not change its value when disabled', async () => {
    const onInputChange = jest.fn()
    render(
      <PasswordField
        onInputChange={onInputChange}
        label="PasswordField"
        name="PasswordField"
        disabled
      />
    )

    const input = screen.getByTestId(/password-input/i)
    expect(input).toBeDisabled()

    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(onInputChange).not.toHaveBeenCalled()
  })

  it('should not be accesible using tab when disabled', () => {
    render(
      <PasswordField label="PasswordField" name="PasswordField" disabled />
    )

    const input = screen.getByLabelText('PasswordField')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).not.toHaveFocus()
  })

  it('should render with error', () => {
    const { container } = render(
      <PasswordField
        label="PasswordField"
        name="PasswordField"
        error="Error message"
      />
    )

    expect(screen.getByText('Error message')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render with loading', () => {
    render(
      <PasswordField
        label="PasswordField"
        name="PasswordField"
        loading="Validating..."
      />
    )

    expect(screen.getByText('Validating...')).toBeInTheDocument()
  })
})
