"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRegisterFeature } from "./hook";
import { useCreateAccount } from "@/useCases/AuthUseCases";
import Logo2 from "@/public/Logo2.svg";
import Image from "next/image";

export default function RegisterFeature() {
  const { form, router } = useRegisterFeature();

  const { mutate, isPending } = useCreateAccount({ router });

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card
        className={cn(
          "w-full max-w-[400px] rounded-[12px] border-none shadow-none px-4 py-10 gap-6"
        )}
      >
        <CardHeader className="text-center">
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

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                        </SelectContent>
                      </Select>
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
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <span className="text-center">already have account? {" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
