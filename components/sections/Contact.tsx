"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { SiteSettings, Homepage } from "@/types/sanity";

type ServiceOption = {
  _id: string;
  title: string;
};

type ContactProps = {
  services: ServiceOption[];
  siteSettings: SiteSettings;
  homepage: Homepage;
};

export function Contact({ services, siteSettings, homepage }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // TODO: Change to siteSettings.email after verifying custom domain in Resend
          to: "donskas@gmail.com",
          replyTo: formData.email,
          subject: `New Inquiry from ${siteSettings.companyName || "Website"}: ${formData.service || "General Enquiry"}`,
          text: `New contact form submission:

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service Interest: ${formData.service || "Not specified"}

Message:
${formData.message}

---
Intended recipient: ${siteSettings.email}
(Emails sent to donskas@gmail.com until custom domain is verified in Resend)`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Email send failed:", errorData);
        throw new Error(errorData.message || "Failed to send");
      }

      toast.success("Message sent successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 bg-black text-white relative"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="w-full lg:w-5/12">
            {homepage.contactLabel && (
              <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">
                {homepage.contactLabel}
              </span>
            )}
            <h2
              id="contact-heading"
              className="font-serif text-4xl md:text-5xl font-bold mb-8"
            >
              {homepage.contactHeadline || "Let's Discuss Your Project"}
            </h2>
            {homepage.contactDescription && (
              <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                {homepage.contactDescription}
              </p>
            )}

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Phone size={20} />
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    Call Us
                  </p>
                  <a
                    href={`tel:${siteSettings.phonePrimary}`}
                    className="block text-xl font-bold text-white hover:text-gold transition-colors"
                  >
                    {siteSettings.phonePrimary}
                  </a>
                  {siteSettings.phoneSecondary && (
                    <a
                      href={`tel:${siteSettings.phoneSecondary}`}
                      className="block text-lg text-gray-400 hover:text-gold transition-colors"
                    >
                      {siteSettings.phoneSecondary}
                    </a>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    Email Us
                  </p>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-xl font-bold text-white hover:text-gold transition-colors"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              {siteSettings.location && (
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                    <MapPin size={20} />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Service Area
                    </p>
                    <p className="text-xl font-bold text-white">
                      {siteSettings.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-7/12 bg-card p-8 md:p-12 text-card-foreground shadow-2xl border-t-4 border-gold">
            <h3 className="font-serif text-2xl font-bold mb-6">
              {homepage.contactFormTitle || "Request a Callback"}
            </h3>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-bold uppercase tracking-wider"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    className="bg-secondary border-border focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-bold uppercase tracking-wider"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone Number"
                    className="bg-secondary border-border focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-bold uppercase tracking-wider"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email Address"
                  className="bg-secondary border-border focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="service"
                  className="text-sm font-bold uppercase tracking-wider"
                >
                  Service Interest
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, service: value }))
                  }
                >
                  <SelectTrigger
                    id="service"
                    className="bg-secondary border-border focus:border-gold transition-colors"
                  >
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service._id} value={service.title}>
                        {service.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-bold uppercase tracking-wider"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  className="bg-secondary border-border focus:border-gold transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-gold text-black hover:bg-gold-light font-bold uppercase tracking-wider px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Enquiry"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
