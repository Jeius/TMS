import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

type FormFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
    control: Control<TFieldValues>; // Ensure control is required here
    name: TName;
    label: string;
};

export function EmailField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
    label,
    control,
    name,
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
                            placeholder="name@example.com"
                            className="bg-card"
                            autoComplete="email"
                            required
                            {...field}
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
                                placeholder="your password"
                                className="bg-card"
                                required
                                {...field}
                            />
                        </FormControl>
                        <div className="absolute right-1 top-1 bottom-1 flex items-center bg-card">
                            <Button
                                variant="ghost"
                                type="button"
                                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                                className="p-1.5 rounded-full size-fit text-muted-foreground"
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
