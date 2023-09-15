import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { API } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}
interface PromptSelectedProps {
  onPromptSelected: (template: string) => void;
}
export function PromptSelect({onPromptSelected, ...props}: PromptSelectedProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  function handlePromptSelected(promptId: string){
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId);
    if(!selectedPrompt){
      return 
    }

    onPromptSelected(selectedPrompt.template);
  }
  useEffect(() => {
    API.get(`/prompts`).then((response) => {
      setPrompts(response.data);
    });
  }, []);
  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..."/>
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(item => {
          return (
            <SelectItem key={item.id} value={item.id} title={item.title}>{item.title}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  );
}
