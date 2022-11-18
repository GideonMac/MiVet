USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Select_ById]    Script Date: 11/18/2022 3:12:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: November 16 2022
-- Description: Get record by Id from dbo.Inventory
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Inventory_Select_ById]
				@Id int

AS

/*
--------- TEST CODE ----------
DECLARE @Id int = 1

EXECUTE dbo.Inventory_Select_ById
		@Id 

SELECT *
FROM dbo.Inventory
WHERE Id = @Id

*/

BEGIN

SELECT i.[Id]
      ,i.[ProductId]
	  ,p.[Name] AS ProductName
      ,i.[Quantity]
      ,i.[BasePrice]
	  ,p.[Description] AS ProductDesc
	  ,pt.[Id] AS ProductTypeId
	  ,pt.[Name] AS ProductType
	  ,v.[Id] AS VendorId
	  ,v.[Name] AS Vendor
      ,i.[VetId]
      ,i.[IsActive]
      ,i.[DateCreated]
      ,i.[DateModified]
      ,i.[CreatedBy]
      ,i.[ModifiedBy]
FROM	dbo.Inventory AS i
		inner join dbo.Products AS p
		ON i.ProductId = p.Id
		inner join dbo.ProductType AS pt
		ON p.ProductTypeId = pt.Id
		inner join dbo.Vendors AS v
		ON p.VendorId = v.Id

WHERE (i.Id = @Id AND i.IsActive = 1)


END
GO
