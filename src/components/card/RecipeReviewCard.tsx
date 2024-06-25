import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Paella de Calamar"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/imgs/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Esta impresionante paella es un plato de fiesta perfecto y una comida divertida de cocinar.
          junto con tus invitados. Agrega 1 taza de guisantes congelados junto con los mejillones,
          Si te gusta.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Caliente el aceite en una paellera (de 14 a 16 pulgadas) o en una sartén grande y profunda sobre
            fuego medio-alto. Agregue el pollo, los camarones y el chorizo ​​y cocine, revolviendo.
            ocasionalmente hasta que esté ligeramente dorado, de 6 a 8 minutos. Transfiera los camarones a un
            plato grande y reserve, dejando el pollo y el chorizo ​​en la sartén. Agregar
            pimentón, laurel, ajo, tomate, cebolla, sal y pimienta, y cocinar,
            revolviendo con frecuencia hasta que espese y esté fragante, aproximadamente 10 minutos. Agregar
            caldo de azafrán y las 4 1/2 tazas restantes de caldo de pollo; llevar a ebullición.
          </Typography>
          <Typography paragraph>
            Agrega el arroz y revuelve muy suavemente para distribuir. Cubra con alcachofas y
            pimientos y cocine sin revolver, hasta que se absorba la mayor parte del líquido.
            15 a 18 minutos. Reduzca el fuego a medio-bajo, agregue los camarones reservados y
            mejillones, metiéndolos en el arroz y cocinar nuevamente sin
            revolviendo, hasta que los mejillones se hayan abierto y el arroz esté tierno, de 5 a 7
            minutos más. (Deseche los mejillones que no se abran).
          </Typography>
          <Typography>
            Apartar del fuego para dejar reposar durante 10 minutos y luego servir.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
