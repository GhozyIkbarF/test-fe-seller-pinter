"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input, InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLoginFeature } from "./hook";
import { useLoginUser } from "@/useCases/AuthUseCases";
import Image from "next/image";
import Logo2 from "@/public/Logo2.svg";

export default function LoginFeature() {
  const { form } = useLoginFeature();

  const { mutate, isPending } = useLoginUser();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card
        className={cn(
          "w-full max-w-[400px] rounded-[12px] border-none shadow-none px-4 py-10 gap-6"
        )}
      >
        <CardHeader className="">
          <Image src={Logo2} alt="Logo" width={100} height={100} className="mx-auto" />
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutate(values))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Input username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        placeholder="Input password"
                        className="w-full"
                        {...field}  
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                disabled={isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <span className="text-center">Don't have an account? {" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
