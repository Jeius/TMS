import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

type FormFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = React.ComponentPropsWithRef<typeof Input> & {
    control: Control<TFieldValues>; // Ensure control is required here
    name: TName;
    label: string;
};

export function EmailField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
    label,
    control,
    name,
    ...props
}: FormFieldProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="bg-card"
                            required
                            {...field}
                            {...props}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function PasswordField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
    label,
    control,
    name,
    ...props
}: FormFieldProps<TFieldValues, TName>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="relative">
                        <FormControl>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                className="bg-card pr-8"
                                required
                                {...field}
                                {...props}
                            />
                        </FormControl>
                        <div className="absolute right-0 top-0 bottom-0 flex items-center">
                            <Button
                                variant="ghost"
                                type="button"
                                size='icon'
                                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                                className="p-1 rounded-full text-muted-foreground hover:bg-transparent"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeClosedIcon aria-hidden="true" /> : <EyeOpenIcon aria-hidden="true" />}
                            </Button>
                        </div>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
