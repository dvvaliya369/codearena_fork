# Enhanced Button Component Documentation

## Overview

The Enhanced Button component extends the standard button functionality with additional features like loading states, icons, new variants, and improved accessibility.

## Features

- ✨ **Multiple Variants**: Default, destructive, outline, secondary, ghost, link, gradient, success, warning
- 📏 **Flexible Sizes**: sm, default, lg, xl, icon
- 🔄 **Loading States**: Built-in loading spinner and disabled state
- 🎨 **Icon Support**: Left and right icon slots
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎛️ **CVA Integration**: Class Variance Authority for consistent styling
- 🔧 **TypeScript**: Full type safety with proper prop interfaces

## Installation

The enhanced button component is already included in the project. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-slot class-variance-authority
```

## Usage

### Basic Usage

```tsx
import { EnhancedButton } from "@/components/ui/enhanced-button";

export default function MyComponent() {
  return <EnhancedButton>Click me</EnhancedButton>;
}
```

### With Variants

```tsx
<EnhancedButton variant="default">Default</EnhancedButton>
<EnhancedButton variant="destructive">Delete</EnhancedButton>
<EnhancedButton variant="outline">Outlined</EnhancedButton>
<EnhancedButton variant="secondary">Secondary</EnhancedButton>
<EnhancedButton variant="ghost">Ghost</EnhancedButton>
<EnhancedButton variant="link">Link</EnhancedButton>
<EnhancedButton variant="gradient">Gradient</EnhancedButton>
<EnhancedButton variant="success">Success</EnhancedButton>
<EnhancedButton variant="warning">Warning</EnhancedButton>
```

### With Sizes

```tsx
<EnhancedButton size="sm">Small</EnhancedButton>
<EnhancedButton size="default">Default</EnhancedButton>
<EnhancedButton size="lg">Large</EnhancedButton>
<EnhancedButton size="xl">Extra Large</EnhancedButton>
<EnhancedButton size="icon">
  <Icon />
</EnhancedButton>
```

### With Icons

```tsx
<EnhancedButton leftIcon={<HeartIcon />}>
  Like
</EnhancedButton>

<EnhancedButton rightIcon={<ArrowIcon />}>
  Next Step
</EnhancedButton>

<EnhancedButton
  leftIcon={<DownloadIcon />}
  rightIcon={<ArrowIcon />}
>
  Download & Continue
</EnhancedButton>
```

### Loading States

```tsx
const [loading, setLoading] = useState(false);

<EnhancedButton loading={loading} onClick={handleAsyncAction}>
  {loading ? "Processing..." : "Start Process"}
</EnhancedButton>;
```

### As Child Component (using Radix Slot)

```tsx
<EnhancedButton asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</EnhancedButton>
```

## API Reference

### EnhancedButtonProps

| Prop        | Type                                                                                                                  | Default     | Description                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------- |
| `variant`   | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" \| "gradient" \| "success" \| "warning"` | `"default"` | Button visual style                         |
| `size`      | `"default" \| "sm" \| "lg" \| "icon" \| "xl"`                                                                         | `"default"` | Button size                                 |
| `loading`   | `boolean`                                                                                                             | `false`     | Shows loading spinner and disables button   |
| `leftIcon`  | `React.ReactNode`                                                                                                     | `undefined` | Icon displayed on the left side             |
| `rightIcon` | `React.ReactNode`                                                                                                     | `undefined` | Icon displayed on the right side            |
| `asChild`   | `boolean`                                                                                                             | `false`     | Renders as child component using Radix Slot |
| `disabled`  | `boolean`                                                                                                             | `false`     | Disables the button                         |
| `className` | `string`                                                                                                              | `undefined` | Additional CSS classes                      |

All standard HTML button attributes are also supported.

## Styling

The component uses Tailwind CSS classes with CVA (Class Variance Authority) for consistent styling. The base styles include:

- Focus ring with proper offset
- Active scale animation
- Smooth transitions
- Proper disabled states
- Loading state handling

## Examples

See `/src/components/button-examples.tsx` for comprehensive usage examples including:

- All variant types
- Different sizes
- Icon combinations
- Loading states
- Real-world use cases

## Pre-commit Hook Integration

This component follows the project's code quality standards and will be automatically:

- Linted with ESLint
- Formatted with Prettier
- Type-checked with TypeScript

Any issues will be caught before commit thanks to the pre-commit hooks configured in this project.

## Accessibility

The Enhanced Button component includes:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Loading state announcements

## Migration from Standard Button

To migrate from the standard Button component:

1. Update your imports:

   ```tsx
   // Old
   import { Button } from "@/components/ui/button";

   // New
   import { EnhancedButton } from "@/components/ui/enhanced-button";
   ```

2. The API is backwards compatible, so existing props will continue to work
3. Add new features as needed (loading, icons, new variants)

## Contributing

When contributing to the Enhanced Button component:

1. Follow the existing TypeScript patterns
2. Add proper JSDoc comments for new props
3. Update this documentation
4. Add tests for new functionality
5. Ensure accessibility standards are maintained
