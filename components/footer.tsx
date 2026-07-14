import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-muted/40 via-background to-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">MA Fragrances</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Discover your signature scent with our curated collection of premium luxury fragrances crafted with the
              finest ingredients.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-accent/10 hover:bg-accent hover:text-background text-accent rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent/10 hover:bg-accent hover:text-background text-accent rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent/10 hover:bg-accent hover:text-background text-accent rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">Shop</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/collections"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  All Fragrances
                </a>
              </li>
              <li>
                <a
                  href="/collections"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Masculine
                </a>
              </li>
              <li>
                <a
                  href="/collections"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Feminine
                </a>
              </li>
              <li>
                <a
                  href="/collections"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Unisex
                </a>
              </li>

            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                <span>123 Luxury Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 flex-shrink-0 text-accent" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 flex-shrink-0 text-accent" />
                <a href="mailto:contact@luxe.com" className="hover:text-accent transition-colors duration-200">
                  contact@luxe.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-foreground">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
                />
                <button className="px-4 py-2 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 hover:scale-105 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 MA Fragrances. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
