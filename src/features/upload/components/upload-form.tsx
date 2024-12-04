/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, CloudUpload, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { getSpecializations } from '../lib/constants';
import MultiSelect from './multi-select';

const formSchema = z.object({
  title: z.string(),
  abstract: z.string().optional(),
  'abstract-pdf': z.string().optional(),
  specializations: z.array(z.string()).nonempty('Please at least one item'),
  authors: z.array(z.string()).nonempty('Please at least one item'),
  adviser: z.string(),
  panelists: z.array(z.string()).nonempty('Please at least one item'),
  manuscript: z.string(),
});

export default function UploadForm() {
  const [abstractFile, setAbstractFile] = useState<File[] | null>(null);
  const [manuscript, setManuscript] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const languages = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'French',
      value: 'fr',
    },
    {
      label: 'German',
      value: 'de',
    },
    {
      label: 'Spanish',
      value: 'es',
    },
    {
      label: 'Portuguese',
      value: 'pt',
    },
    {
      label: 'Russian',
      value: 'ru',
    },
    {
      label: 'Japanese',
      value: 'ja',
    },
    {
      label: 'Korean',
      value: 'ko',
    },
    {
      label: 'Chinese',
      value: 'zh',
    },
  ] as const;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specializations: [],
      authors: [],
      panelists: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thesis Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the title of the thesis... "
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the abstract of the thesis..."
                  className="min-h-52 text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can type or paste the thesis abstract here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="abstract-pdf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Abstract</FormLabel>
              <FormControl>
                <FileUploader
                  value={abstractFile}
                  onValueChange={setAbstractFile}
                  dropzoneOptions={dropZoneConfig}
                  className="relative rounded-lg bg-background p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex w-full flex-col items-center justify-center p-8">
                      <CloudUpload className="size-10 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {abstractFile &&
                      abstractFile.length > 0 &&
                      abstractFile.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="size-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>
                You can upload the abstract in PDF.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specializations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Areas of Specialization</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                  className="max-w-sm text-sm"
                >
                  <MultiSelect
                    id="specialization"
                    queryFn={getSpecializations}
                    placeholder="Select areas of specialization"
                  />
                </MultiSelector>
              </FormControl>
              <FormDescription>
                Specify the areas of specialization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author(s)</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                  className="max-w-sm text-sm"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select author(s)" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      <MultiSelectorItem value={'React'}>
                        React
                      </MultiSelectorItem>
                      <MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
                      <MultiSelectorItem value={'Svelte'}>
                        Svelte
                      </MultiSelectorItem>
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormDescription>Select author(s) of the thesis.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adviser"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Adviser</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : 'Select adviser'}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search adviser..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('adviser', language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 size-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="panelists"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Panelists</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                  className="max-w-sm text-sm"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select panelists" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      <MultiSelectorItem value={'React'}>
                        React
                      </MultiSelectorItem>
                      <MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
                      <MultiSelectorItem value={'Svelte'}>
                        Svelte
                      </MultiSelectorItem>
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manuscript"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Manuscript</FormLabel>
              <FormControl>
                <FileUploader
                  value={manuscript}
                  onValueChange={setManuscript}
                  dropzoneOptions={dropZoneConfig}
                  className="relative rounded-lg bg-background p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex w-full flex-col items-center justify-center p-8">
                      <CloudUpload className="size-10 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {manuscript &&
                      manuscript.length > 0 &&
                      manuscript.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="size-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>
                Select a thesis manuscript to upload in PDF.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
