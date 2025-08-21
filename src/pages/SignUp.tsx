import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (result.success) {
        toast({
          title: "Erfolgreich!",
          description: "Account erfolgreich erstellt. Willkommen bei Koenigskristall!",
        });
        navigate("/");
      } else {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Etwas ist schief gelaufen. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-18 flex items-center justify-center bg-gradient-crystal px-4 py-12">
      <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-crystal">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full animate-sparkle"></div>
            </div>
          </div>
          <CardTitle className="font-serif text-2xl font-light">Melde dich an</CardTitle>
          <CardDescription className="text-muted-foreground">
            Beginne deine Kristallreise mit mir 
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  Vorname
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Vorname"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-background/50 border-border/60 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Nachname
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Nachname"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-background/50 border-border/60 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-border/60 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Passwort
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Passwort erstellen"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-background/50 border-border/60 focus:border-primary pr-10"
                  required
                  minLength={8}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Passwort muss mindestens 8 Zeichen lang sein
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                Ich stimme den {" "}
                <Link to="/AGB" className="text-primary hover:underline">
                  Nutzungs-
                </Link>{" "}
                und{" "}
                <Link to="/Datenschutz" className="text-primary hover:underline">
                  Datenschutzbestimmungen
                </Link>
                 {" "} zu
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!formData.acceptTerms || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium tracking-wide shadow-crystal disabled:opacity-50"
            >
              {isLoading ? "Account wird erstellt..." : "Account erstellen"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Du hast bereits ein Konto?{" "}
              <Link to="/signin" className="text-primary hover:underline font-medium">
                Anmelden
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;