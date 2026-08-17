import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiHeart, 
  FiTrendingUp,
  FiClock,
  FiAward
} from 'react-icons/fi';

export default function Home() {
  const features = [
    { icon: <FiTruck size={20} />, title: "Free Shipping", desc: "On orders over $100", color: "from-teal-500 to-teal-600" },
    { icon: <FiShield size={20} />, title: "Secure Payment", desc: "100% safe checkout", color: "from-rose-500 to-rose-600" },
    { icon: <FiHeart size={20} />, title: "Trendy Styles", desc: "Latest fashion trends", color: "from-amber-500 to-amber-600" },
    { icon: <FiAward size={20} />, title: "Quality Guarantee", desc: "Premium materials", color: "from-violet-500 to-purple-600" },
  ];

  const categories = [
    { name: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop", color: "from-rose-500 to-pink-500", items: "200+ styles" },
    { name: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800c2c?w=400&h=500&fit=crop", color: "from-teal-500 to-cyan-500", items: "150+ styles" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop", color: "from-amber-500 to-orange-500", items: "100+ styles" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop", color: "from-violet-500 to-purple-500", items: "80+ styles" },
  ];

  const trendingProducts = [
    { id: 1, name: "Floral Summer Dress", price: "$89", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop", rating: 4.8 },
    { id: 2, name: "Classic Denim Jacket", price: "$129", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=300&h=400&fit=crop", rating: 4.9 },
    { id: 3, name: "Elegant Evening Gown", price: "$199", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop", rating: 4.7 },
    { id: 4, name: "Casual Sneakers", price: "$79", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop", rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-rose-300 to-amber-300  pt-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-medium">2024 New Collection</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Discover Your
                <span className="block bg-gradient-to-r from-amber-300 via-rose-300 to-teal-300 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Explore our latest collection of fashionable clothing and accessories. Elevate your style with ELARA.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-rose-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Shop Now
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  View Collection
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8 justify-center lg:justify-start mt-12"
              >
                <div>
                  <div className="text-2xl font-bold text-white">10k+</div>
                  <div className="text-white/70 text-sm">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-white/70 text-sm">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="text-white/70 text-sm">Customer Rating</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=700&fit=crop" 
                  alt="Fashion Model"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <FiStar className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-800">New Arrival</span>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2"
                >
                  <p className="text-white text-sm">Summer Collection 2024</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose ELARA?</h2>
            <p className="text-white/80 text-lg">Experience the best in fashion with our premium services</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-white/80 text-lg">Find exactly what you're looking for</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={category.image} alt={category.name} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{category.items}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className={`bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2`}
                  >
                    Shop Now <FiArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trending Now</h2>
            <p className="text-white/80 text-lg">Most popular items this season</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-rose-500 rounded-full p-1.5">
                    <FiHeart size={14} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <FiStar size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white/80 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all"
                  >
                    Quick View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in Style</h2>
            <p className="text-white/80 text-lg mb-6">Subscribe to get exclusive offers and latest fashion updates</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-rose-600 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}