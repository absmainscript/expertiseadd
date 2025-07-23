/**
 * AboutSection.tsx
 * 
 * Seção "Sobre a Psicóloga" do site
 * Apresenta informações profissionais, qualificações e abordagem terapêutica
 * Contém cards com especialidades e animações de entrada suave
 * Utiliza Intersection Observer para ativar animações ao rolar a página
 */

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck,
  GraduationCap,
  Award,
  Users,
  Brain,
  Zap,
  Target,
  Lightbulb,
  Shield
} from "lucide-react";
import { OptimizedMotion } from "./OptimizedMotion";
import { processGradientText } from "@/utils/textGradient";
import type { SiteConfig, ExpertiseCard } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { processTextWithGradient } from "@/utils/textGradient";

const iconMap = {
  Brain,
  Heart,
  Users,
  Star,
  Shield,
  Target,
  Lightbulb,
  Zap,
  BookOpen,
  Sparkles,
};

export default function AboutSection() {
  const { data: configs = [] } = useQuery<SiteConfig[]>({
    queryKey: ["/api/admin/config"],
    staleTime: 0,
    refetchInterval: 2000,
  });

  const { data: areas = [] } = useQuery<ExpertiseCard[]>({
    queryKey: ["/api/specialization-areas"],
    staleTime: 0,
    refetchInterval: 2000,
  });

  const heroImage = configs?.find((c: any) => c.key === "hero_image");
  const customImage = heroImage?.value?.path || null;

  const generalInfo = configs?.find((c: any) => c.key === "general_info")?.value as any || {};
  const aboutSection = configs?.find((c: any) => c.key === "about_section")?.value as any || {};
  const currentCrp = generalInfo.crp || "08/123456";
  const aboutText = aboutSection.description || "";

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-spacing bg-gradient-to-br from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto mobile-container max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-16 lg:items-stretch">
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="card-aesthetic p-8 flex flex-col w-full h-full"
            >
              <div className="text-left h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="font-display font-medium text-2xl md:text-3xl text-gray-800 mb-2">
                    <span className="text-gradient">{generalInfo.name || "Dra. Adrielle Benhossi"}</span>
                  </h3>
                  <p className="text-pink-500 text-sm mb-6 font-medium">Psicóloga Clínica • CRP: {currentCrp}</p>

                  <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {aboutText || "Este é o espaço para escrever sobre você no painel administrativo."}
                  </p>

                  <div className="flex flex-col items-center justify-end pt-4">
                    <div className="grid grid-cols-1 gap-3 text-center w-full max-w-xs">
                      {(() => {
                        const aboutCredentials = configs?.find((c: any) => c.key === "about_credentials")?.value as any[] || [];
                        const activeCredentials = aboutCredentials
                          .filter(cred => cred.isActive !== false)
                          .sort((a, b) => (a.order || 0) - (b.order || 0));

                        if (activeCredentials.length === 0) {
                          // Fallback para dados padrão se não houver credenciais configuradas
                          return (
                            <>
                              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-2xl">
                                <div className="text-sm font-semibold text-gray-700">Centro Universitário Integrado</div>
                                <div className="text-xs text-gray-500 mt-1">Formação Acadêmica</div>
                              </div>
                              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-2xl">
                                <div className="text-sm font-semibold text-gray-700">Terapia Cognitivo-Comportamental</div>
                                <div className="text-xs text-gray-500 mt-1">Abordagem Terapêutica</div>
                              </div>
                              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-2xl">
                                <div className="text-sm font-semibold text-gray-700">Mais de 5 anos de experiência</div>
                                <div className="text-xs text-gray-500 mt-1">Experiência Profissional</div>
                              </div>
                            </>
                          );
                        }

                        return activeCredentials.map((credential: any) => (
                          <div key={credential.id} className={`bg-gradient-to-br ${credential.gradient} p-4 rounded-2xl`}>
                            <div className="text-sm font-semibold text-gray-700">{credential.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{credential.subtitle}</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <div className="h-full flex items-center justify-center">
              <div className="h-[800px] w-px bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="card-aesthetic p-8 flex flex-col w-full h-full"
            >
              <div className="mb-8">
                <h2 className="font-display font-medium text-2xl sm:text-3xl mb-4">
                  {processTextWithGradient(aboutSection.title || "Minhas (especialidades)")}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {aboutSection.subtitle || "Áreas especializadas onde posso te ajudar a encontrar equilíbrio e bem-estar emocional"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {areas.map((area) => {
                  const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Brain;

                  return (
                    <div key={area.id} className="card-aesthetic p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2 text-lg">{area.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}