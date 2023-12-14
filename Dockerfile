# Utilise une image Symfony prête à l'emploi avec PHP 8.2
FROM ghcr.io/eko/docker-symfony:8.2

# Installation des dépendances Symfony
COPY composer.json composer.lock /var/www/symfony/
RUN composer install --no-scripts --no-autoloader

# Ajout du code source
COPY . /var/www/symfony/

# Regénère l'autoloader
RUN composer dump-autoload --optimize

# Expose le port 8000 pour l'accès à l'application Symfony
EXPOSE 8000

# Lance le serveur web Symfony
CMD ["php", "bin/console", "server:run", "0.0.0.0:8000"]