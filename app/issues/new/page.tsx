import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Submit Issue</Button>
    </div>
  );
};

export default NewIssue;
