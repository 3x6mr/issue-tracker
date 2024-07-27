"use client";
import React, { useState } from "react";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { MdErrorOutline } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { insertIssueSchema } from "@/app/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

const NewIssue = () => {
  const route = useRouter();
  const [error, setError] = useState("");

  type IssueForm = z.infer<typeof insertIssueSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(insertIssueSchema),
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            route.push("/issues");
          } catch (error) {
            setError("An Unexpected error occured!");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}

        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
