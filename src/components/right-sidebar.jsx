import { ChevronRight } from "lucide-react";

export function RightSidebar() {
  const trendingArticles = [
    {
      title: "Cheapest Airlines for Southeast Asia Flights",
      description: "Find the best deals on flights across Southeast Asia",
      readMore: "Read More →"
    },
    {
      title: "Best Hidden Beaches in Bali",
      description: "Discover secluded paradise beaches away from crowds",
      readMore: "Read More →"
    },
    {
      title: "Budget Travel Tips for Indonesia",
      description: "How to explore Indonesia on a tight budget",
      readMore: "Read More →"
    }
  ];

  const popularTopics = [
    "Beach Destinations", "Budget Travel", "Family Trips", 
    "AI Tips", "Food Experiences", "Solo Adventures"
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome to Fashion.ai</h3>
        <p className="text-sm text-gray-600">Your fashion community platform</p>
      </div>

      {/* Trending Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">What's Trending This Week</h3>
        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
              <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{article.description}</p>
              <a href="#" className="text-blue-500 text-sm font-medium hover:text-blue-600">
                {article.readMore}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Popular Topics</h3>
          <a href="#" className="text-blue-500 text-sm font-medium hover:text-blue-600">See More</a>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Fashion Tips Exchange */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Fashion Tips Exchange</h3>
          <a href="#" className="text-blue-500 text-sm font-medium hover:text-blue-600">See More</a>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">NT</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">@nadiatravels</div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Always carry small bills (IDR 10K-50K) when exploring local markets — most vendors don't accept large denominations.
          </p>
        </div>
      </div>
    </div>
  );
} 