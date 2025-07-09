import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import faqs from "../data/faqs.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [value, setValue] = useState("hello");

  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 gap-3 w-full">
      <h1 className="text-7xl text-center px-6 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Find Your Dream Job and get Hired
      </h1>
      <h2>Explore thousands of job listings or find the perfect candidate</h2>
      <div className="flex justify-center gap-6 mt-6">
        <Button variant="destructive" size="xl">
          Post job
        </Button>

        <Button
          variant="blue"
          size="xl"
          onClick={() => {
            navigate("/job-list");
          }}
        >
          Find job
        </Button>
      </div>
      <section className="w-full px-8 flex justify-between mt-14">
        <Carousel
          plugins={[
            Autoplay({
              delay: 1000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center ">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
     

      <section className="w-full  mt-8 bg-[#000014]">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default LandingPage;
