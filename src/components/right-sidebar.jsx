import { ChevronRight, TrendingUp, Hash, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function RightSidebar() {
  const trendingArticles = [
    {
      title: "Minimalist Casual Style for Everyday",
      description: "Tips for mixing casual clothes that are simple yet stylish",
      readMore: "Read More →",
      author: "Fashion Expert",
      avatar: "FE"
    },
    {
      title: "Latest Fashion Trends 2024",
      description: "Update on trending fashion collections this year",
      readMore: "Read More →",
      author: "Style Guide",
      avatar: "SG"
    },
    {
      title: "Mix & Match Budget Outfit",
      description: "Guide to mix and match clothes on a budget",
      readMore: "Read More →",
      author: "Budget Fashion",
      avatar: "BF"
    }
  ];

  const popularTopics = [
    "Casual Style", "Work Fashion", "OOTD", 
    "Fashion Tips", "Modest Fashion", "Korean Style"
  ];

  return (
    <div
      className="w-80 bg-black/20 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto custom-scrollbar"
      style={{ borderRadius: "5px" }}
    >
      {/* Welcome Section */}
      <Card className="mb-6 supabase-gradient-card" style={{ borderRadius: "5px" }}>
        <CardHeader className="pb-3" style={{ borderRadius: "5px" }}>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-green-400" />
            Welcome to Threadify
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your fashion community platform
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Trending Section */}
      <Card className="mb-6 supabase-gradient-card" style={{ borderRadius: "5px" }}>
        <CardHeader className="pb-3" style={{ borderRadius: "5px" }}>
          <CardTitle className="text-base flex items-center gap-2 text-white">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Trending Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" style={{ borderRadius: "5px" }}>
          {trendingArticles.map((article, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8" style={{ borderRadius: "5px" }}>
                  <AvatarFallback className="text-xs bg-green-500/20 text-green-400 border-green-500/30" style={{ borderRadius: "5px" }}>
                    {article.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium leading-tight text-white">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {article.description}
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-green-400 hover:text-green-300"
                    style={{ borderRadius: "5px" }}
                  >
                    {article.readMore}
                  </Button>
                </div>
              </div>
              {index < trendingArticles.length - 1 && <Separator className="bg-white/10" style={{ borderRadius: "5px" }} />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card className="supabase-gradient-card" style={{ borderRadius: "5px" }}>
        <CardHeader className="pb-3" style={{ borderRadius: "5px" }}>
          <CardTitle className="text-base flex items-center gap-2 text-white">
            <Hash className="w-4 h-4 text-green-400" />
            Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent style={{ borderRadius: "5px" }}>
          <div className="flex flex-wrap gap-2">
            {popularTopics.map((topic, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-black/20 text-gray-300 border-white/10 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30"
                style={{ borderRadius: "5px" }}
              >
                #{topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 