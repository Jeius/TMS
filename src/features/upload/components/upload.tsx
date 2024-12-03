import { Card, CardContent } from '@/components/ui/card';
import UploadForm from './upload-form';

export default function Upload() {
  return (
    <Card className="mx-auto max-w-3xl">
      <CardContent>
        <UploadForm />
      </CardContent>
    </Card>
  );
}
