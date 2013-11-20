var Vectors = 
{
	add : function(vA, vB)
	{
		return {"x" : vA.x + vB.x, "y" : vA.y + vB.y};
	},
	sub : function(vA, vB)
	{
		return {"x" : vA.x - vB.x, "y" : vA.y - vB.y};
	},
	mult : function(vA, m)
	{
		return {"x" : vA.x *m, "y" : vA.y * m};
	},
	magnitude : function(vA)
	{
		return Math.sqrt(vA.x*vA.x + vA.y*vA.y);
	},
	div : function(vA, m)
	{
		if(m !== 0)
			return {"x" : vA.x /m, "y" : vA.y / m};
		else
			return vA;
	},
	limit :function(vA, max)
	{
		if(this.magnitude(vA) > max)
		{
			vA = this.normalize(vA);
			return this.mult(vA, max);
		}
		else
			return vA;
	},
	normalize : function(vA)
	{
		var m = this.magnitude(vA);
		return this.div(vA, m);
	}
}