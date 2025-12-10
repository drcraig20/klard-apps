import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckboxField } from '@/components/ui/checkbox-field';

describe('CheckboxField', () => {
  it('renders checkbox without label', () => {
    const onChange = vi.fn();
    render(<CheckboxField checked={false} onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders checkbox with label', () => {
    const onChange = vi.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
      />
    );

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders checkbox with label and description', () => {
    const onChange = vi.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
        description="You must accept to continue"
      />
    );

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('You must accept to continue')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<CheckboxField checked={false} onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<CheckboxField checked={false} onChange={onChange} disabled />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders indeterminate state', () => {
    const onChange = vi.fn();
    render(<CheckboxField checked={false} onChange={onChange} indeterminate />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
  });

  it('has accessible label association', () => {
    const onChange = vi.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAccessibleName('Accept terms');
  });

  it('applies disabled styling', () => {
    const onChange = vi.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
        disabled
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});