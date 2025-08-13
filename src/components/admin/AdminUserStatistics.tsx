import { UserStatistics } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  Shield, 
  TrendingUp, 
} from 'lucide-react';

interface AdminUserStatisticsProps {
  statistics: UserStatistics;
}

export const AdminUserStatistics = ({ statistics }: AdminUserStatisticsProps) => {
  const stats = [
    {
      title: 'Gesamt Benutzer',
      value: statistics.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Alle registrierten Benutzer'
    },
    {
      title: 'Kunden',
      value: statistics.customerCount,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Registrierte Kunden'
    },
    {
      title: 'Administratoren',
      value: statistics.adminCount,
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Systemadministratoren'
    },
    {
      title: 'Neue Benutzer',
      value: statistics.recentUsers,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Letzte 30 Tage'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.description}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {stat.value.toLocaleString('de-DE')}
                </CardTitle>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 