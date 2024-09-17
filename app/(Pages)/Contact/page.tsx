
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, Linkedin } from 'lucide-react';

// Import images from the assets folder
import img1 from '../../../assets/man1.jpg';
import img2 from '../../../assets/man2.jpg';
import img3 from '../../../assets/man3.jpg';


const ContactPage = () => {
  const coordinators = [
    {
      name: 'John Doe',
      photo: img1,
      mobile: '+1 234 567 8901',
      email: 'john.doe@example.com',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      name: 'Jane Smith',
      photo: img2,
      mobile: '+1 987 654 3210',
      email: 'jane.smith@example.com',
      linkedin: 'https://www.linkedin.com/in/janesmith',
    },
    {
      name: 'Mike Johnson',
      photo: img3,
      mobile: '+1 456 789 0123',
      email: 'mike.johnson@example.com',
      linkedin: 'https://www.linkedin.com/in/mikejohnson',
    },
  ];

  return (
    <div className="container w-full mx-auto px-4 py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-800">Our Coordinators</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {coordinators.map((coordinator, index) => (
          <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-blue-100">
            <CardHeader className="pb-2">
              <Avatar className="w-32 h-32 mx-auto ring-4 ring-blue-200">
                <AvatarImage src={coordinator.photo.src} alt={coordinator.name} />
                <AvatarFallback className="bg-blue-500 text-white text-2xl">
                  {coordinator.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-xl font-semibold text-blue-700">{coordinator.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4">
                <Phone className="w-5 h-5 text-blue-500" />
                <p className="text-gray-600 font-medium">{coordinator.mobile}</p>
              </div>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <p className="text-gray-600 font-medium">{coordinator.email}</p>
              </div>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <Linkedin className="w-5 h-5 text-blue-500" />
                <a
                  href={coordinator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  LinkedIn Profile
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center text-blue-900">Contact Us</h1>

      <div className="max-w-2xl mx-auto mb-16 bg-white p-8 rounded-lg shadow-2xl">
        <form className="space-y-6">
          <Input
            type="text"
            placeholder="Your Name"
            required
            className="border-blue-200 focus:ring-blue-500 focus:border-blue-500"
          />
          <Input
            type="email"
            placeholder="Your Email"
            required
            className="border-blue-200 focus:ring-blue-500 focus:border-blue-500"
          />
          <Input
            type="text"
            placeholder="Subject"
            required
            className="border-blue-200 focus:ring-blue-500 focus:border-blue-500"
          />
          <Textarea
            placeholder="Your Message"
            required
            className="h-32 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
