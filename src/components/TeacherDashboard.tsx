import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  TrendingUp,
  Clock,
  Trophy,
  AlertTriangle,
  BookOpen,
  Target,
  Download
} from 'lucide-react';

// Sample teacher dashboard data
const classStats = {
  totalStudents: 28,
  activeToday: 24,
  avgCompletionRate: 73,
  avgStudyTime: 42, // minutes
  studentsNeedingHelp: 5
};

const studentProgress = [
  { name: 'Priya', math: 85, science: 78, language: 92, overall: 85 },
  { name: 'Arjun', math: 72, science: 88, language: 69, overall: 76 },
  { name: 'Meera', math: 91, science: 85, language: 87, overall: 88 },
  { name: 'Kiran', math: 45, science: 52, language: 48, overall: 48 },
  { name: 'Rohit', math: 67, science: 74, language: 71, overall: 71 },
];

const weeklyActivity = [
  { day: 'Mon', minutes: 145, students: 22 },
  { day: 'Tue', minutes: 167, students: 25 },
  { day: 'Wed', minutes: 134, students: 19 },
  { day: 'Thu', minutes: 189, students: 27 },
  { day: 'Fri', minutes: 156, students: 24 },
  { day: 'Sat', minutes: 98, students: 15 },
  { day: 'Sun', minutes: 67, students: 12 }
];

const subjectDistribution = [
  { name: 'Math', value: 35, color: '#3b82f6' },
  { name: 'Science', value: 28, color: '#10b981' },
  { name: 'Language', value: 25, color: '#8b5cf6' },
  { name: 'Arts', value: 12, color: '#f59e0b' }
];

export const TeacherDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Class 8-A Performance Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-learning-progress" />
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{classStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-learning-completed" />
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold">{classStats.activeToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-learning-progress" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{classStats.avgCompletionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-learning-new" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Study Time</p>
                <p className="text-2xl font-bold">{classStats.avgStudyTime}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Need Help</p>
                <p className="text-2xl font-bold">{classStats.studentsNeedingHelp}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Progress</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjectDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studentProgress.map((student) => (
                  <div key={student.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{student.name}</h4>
                      <Badge variant={student.overall >= 75 ? 'default' : student.overall >= 50 ? 'secondary' : 'destructive'}>
                        {student.overall}% Overall
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Math</span>
                          <span>{student.math}%</span>
                        </div>
                        <Progress value={student.math} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Science</span>
                          <span>{student.science}%</span>
                        </div>
                        <Progress value={student.science} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Language</span>
                          <span>{student.language}%</span>
                        </div>
                        <Progress value={student.language} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={studentProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="language" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Students Needing Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProgress
                    .filter(student => student.overall < 60)
                    .map((student) => (
                      <div key={student.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Struggling in: {student.math < 60 ? 'Math ' : ''}{student.science < 60 ? 'Science ' : ''}{student.language < 60 ? 'Language' : ''}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive">
                          {student.overall}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};