import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070709] border-t border-dark-border pt-20 pb-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Logo & Pitch */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-display font-black tracking-tight flex items-center">
                <span className="text-gradient-orange-gold">Food</span>
                <span className="text-slate-100 ml-1">Explorer</span>
                <span className="text-brand-orange text-xs px-1.5 py-0.5 rounded-md border border-brand-orange/20 bg-brand-orange/10 font-bold ml-2">PRO</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Explore gourmet recipes, ingredients, and cooking cultures from around the world. Powered by TheMealDB API.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaInstagram className="w-4 h-4" />, url: '#' },
                { icon: <FaTwitter className="w-4 h-4" />, url: '#' },
                { icon: <FaFacebook className="w-4 h-4" />, url: '#' },
                { icon: <Mail className="w-4 h-4" />, url: '#' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  className="p-2.5 rounded-full border border-dark-border bg-dark-surface hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-slate-100 tracking-wide uppercase text-sm mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-brand-orange transition-colors">Categories</a>
              </li>
              <li>
                <a href="#search" className="hover:text-brand-orange transition-colors">Recipe Search</a>
              </li>
              <li>
                <a href="#cuisine" className="hover:text-brand-orange transition-colors">Global Cuisine</a>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-brand-orange transition-colors">Saved Recipes</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-slate-100 tracking-wide uppercase text-sm mb-6">
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span>100 Culinary Blvd, Suite 400<br />Gourmet District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <span>+1 (800) FOOD-EXP</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <span>concierge@foodexplorer.pro</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-slate-100 tracking-wide uppercase text-sm mb-2">
              Subscribe to Gourmet Digest
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Get the latest curated recipes and culinary guides delivered to your inbox weekly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-dark-surface/90 border border-dark-border text-slate-200 placeholder:text-slate-500 rounded-xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-2 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="h-[1px] bg-dark-border mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} Food Explorer Pro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
