import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UrlList({ urls }: { urls: string[] }) {
    return (
      <Card className="bg-field dark:bg-neutral-950">
        <CardHeader>
          <CardTitle>URLs in JMX File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Below are the URLs found in your JMX file.
          </p>
          <ul className="list-disc pl-5">
            {urls.map((url) => (
              <li key={url} className="text-sm text-muted-foreground">
                {url}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }