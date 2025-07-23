
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Star, Shield, Target, Lightbulb, Zap } from "lucide-react";
import { OptimizedMotion } from "./OptimizedMotion";
import { processGradientText } from "@/utils/textGradient";
import type { ExpertiseCard, SiteConfig } from "@shared/schema";

const iconMap = {
  Brain,
  Heart,
  Users,
  Star,
  Shield,
  Target,
  Lightbulb,
  Zap,
};

export function SpecializationSection() {
  const { data: areas = [] } = useQuery<ExpertiseCard[]>({
    queryKey: ["/api/specialization-areas"],
    staleTime: 0, // Remove cache para atualização imediata
    refetchInterval: 2000, // Atualiza a cada 2 segundos
  });

  const { data: configs = [] } = useQuery<SiteConfig[]>({
    queryKey: ["/api/admin/config"],
    staleTime: 0, // Remove cache para atualização imediata
    refetchInterval: 2000, // Atualiza a cada 2 segundos
  });

  const sectionConfig = configs.find(c => c.key === 'specialization_section')?.value as any || {};
  const title = sectionConfig.title || "Áreas de Especialização";
  const subtitle = sectionConfig.subtitle || "Como posso te ajudar";
  const description = sectionConfig.description || "Oferecemos apoio especializado nas principais áreas da saúde mental";

  if (!areas.length) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <OptimizedMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            {processGradientText(subtitle)}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            {processGradientText(title)}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {processGradientText(description)}
          </p>
        </OptimizedMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {areas.map((area, index) => {
            const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Brain;
            
            return (
              <OptimizedMotion
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-sm"
                  style={{ backgroundColor: area.backgroundColor }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-gray-700" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      {processGradientText(area.title)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {processGradientText(area.description)}
                    </p>
                  </CardContent>
                </Card>
              </OptimizedMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
