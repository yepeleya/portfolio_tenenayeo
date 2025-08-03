import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Search, Trash2, Eye, Calendar } from 'lucide-react';
import { contactService, type Contact } from '../../services/adminApi';

const AdminContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll();
      setContacts(data);
    } catch (error: any) {
      console.error('Erreur lors du chargement des contacts:', error);
      setError('Impossible de charger les contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      return;
    }

    try {
      await contactService.delete(id);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du contact');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={loadContacts} className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Contacts</h1>
          <p className="text-gray-600">
            {contacts.length} contact{contacts.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button onClick={loadContacts}>
          Actualiser
        </Button>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, email ou message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des contacts */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun contact</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Aucun contact ne correspond à votre recherche.' : 'Aucun contact pour le moment.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className={`${!contact.read_status ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {contact.name}
                      {!contact.read_status && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Nouveau
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(contact.created_at)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!contact.read_status && (
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistiques */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {contacts.filter(c => !c.read_status).length}
              </div>
              <div className="text-sm text-gray-600">Non lus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contacts.filter(c => new Date(c.created_at).toDateString() === new Date().toDateString()).length}
              </div>
              <div className="text-sm text-gray-600">Aujourd'hui</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContactsPage;