import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = "Contact from Portfolio";
    const body = `From: ${email}%0D%0A%0D%0A${message}`;
    const mailtoLink = `mailto:justinmmanoj@gmail.com?subject=${subject}&body=${body}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    // Show success message
    toast({
      title: "Opening email client...",
      description: "Your default email client should open shortly.",
    });
    
    // Reset form
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="w-full">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-background/50 border-border/40 focus:border-border rounded-lg"
        />
      </div>
      <div className="w-full">
        <Textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full bg-background/50 border-border/40 focus:border-border rounded-lg resize-none"
        />
      </div>
      <Button type="submit" className="rounded-full">Submit</Button>
    </form>
  );
};
