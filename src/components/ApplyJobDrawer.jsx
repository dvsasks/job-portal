import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { Select } from "./ui/select";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import useApi from "@/hooks/useApi";
import { applyToJob } from "@/api/applictaionsApi";

const ApplyJobDrawer = ({
  variant,
  className,
  applied,
  fnGetJob,
  job,
  user,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const {
    data,
    fn: fnApply,
    errors: applyErrors,
    isLoading,
  } = useApi(applyToJob);
  function submitForm(data) {
    console.log("clicked");
    console.log(data);

    fnApply({ ...data, job_id: job.job_id, candidate_id: user.id }).then(() => {
      console.log(job.job_id);
      fnGetJob({ jobId: job.job_id });
      reset();
    });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={applied ? "destructive" : variant}
          className={`${className}`}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mt-2">
        <div className=" p-2 w-full">
          <DrawerHeader>
            <DrawerTitle className="text-start text-l">
              {job?.title}
            </DrawerTitle>
            <DrawerDescription className="text-start text-sm text-gray-600">
              fill the below details
            </DrawerDescription>
          </DrawerHeader>

          <form
            className="flex flex-col gap-2 justify-start w-full"
            onSubmit={handleSubmit(submitForm)}
          >
            <Input
              {...register("name")}
              className="flex-1"
              type="text"
              placeholder="Please enter your name "
            />
            <Input
              {...register("experience")}
              className="flex-1"
              type="number"
              placeholder="years of experience "
            />
            <Input
              {...register("skills")}
              className="flex-1"
              type="text"
              placeholder="Skills comma seperated "
            />
            <Controller
              name="gender"
              control={control}
              defaultValue="male"
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? "male"}
                  className="flex flex-col "
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="r1" />
                    <label htmlFor="r1">Male</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="r2" />
                    <label htmlFor="r2">Female</label>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <RadioGroupItem value="other" id="r3" />
                    <label htmlFor="r3">Other</label>
                  </div>
                </RadioGroup>
              )}
            />

            <Input type="file" {...register("resume")} />
            <Button
              type="submit"
              variant="blue"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Applying" : "Apply"}
            </Button>
          </form>
          <DrawerClose asChild>
            <Button className="w-full mt-4" variant="destructive">
              Cancel
            </Button>
          </DrawerClose>

          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
