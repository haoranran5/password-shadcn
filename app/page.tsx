"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER = "0123456789";
const SYMBOL = "!@#$%^&*()_+-=<>?";

function generatePassword({ length, lower, upper, number, symbol }: { length: number; lower: boolean; upper: boolean; number: boolean; symbol: boolean; }) {
  let chars = "";
  if (lower) chars += LOWER;
  if (upper) chars += UPPER;
  if (number) chars += NUMBER;
  if (symbol) chars += SYMBOL;
  if (!chars) return "";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export default function Home() {
  const [length, setLength] = useState(12);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setPassword(generatePassword({ length, lower, upper, number, symbol }));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({ title: "复制成功", description: "密码已复制到剪贴板" });
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>密码生成器</CardTitle>
          <CardDescription>自定义长度和字符类型，一键生成高强度密码。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">密码长度：{length}</label>
            <Slider min={6} max={32} step={1} value={[length]} onValueChange={v => setLength(v[0])} />
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={lower} onCheckedChange={setLower} />小写字母
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={upper} onCheckedChange={setUpper} />大写字母
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={number} onCheckedChange={setNumber} />数字
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={symbol} onCheckedChange={setSymbol} />符号
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">生成的密码</label>
            <Input value={password} readOnly disabled className="font-mono select-all" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={handleGenerate} type="button">生成密码</Button>
          <Button onClick={handleCopy} type="button" variant="secondary" disabled={!password}>
            {copied ? "已复制" : "复制密码"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
